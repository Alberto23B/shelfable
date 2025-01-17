import express from "express";
import connection from "../db/connection.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import LocalStrategy from "passport-local";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const api = express.Router();

let db;

const checkDbConnection = (req, res, next) => {
  if (!db) {
    return res.status(500).json({ error: "Database not connected yet" });
  }
  next();
};

connection(async (client) => {
  db = await client.db("TheGoodReads").collection("users");

  api.use(checkDbConnection);

  api.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: MongoStore.create({
        mongoUrl: process.env.ATLAS_URI,
        collectionName: "cookies",
      }),
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 60000 * 15,
      },
    })
  );

  api.use(passport.initialize());
  api.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await db.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    })
  );

  api.use("/", async (req, res, next) => {
    if (req.user) {
      return next();
    }
    if (req.isAuthenticated()) {
      try {
        const userId = req.user._id;
        const user = await db.findOne({ _id: new ObjectId(userId) });
        if (!user) {
          return res.sendStatus(404);
        }
        req.user = user;
        return next();
      } catch (err) {
        return next(err);
      }
    } else {
      return next();
    }
  });

  //login routes

  api.post("/login", (req, res, next) => {
    if (req.user) {
      return res.status(400).send({ message: "Already logged in" });
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        console.error("No user found");
        return res
          .status(401)
          .json({ success: false, message: "Login failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          success: true,
          message: "Login successful",
          redirectUrl: "/",
        });
      });
    })(req, res, next);
  });

  api.get("/logout", (req, res) => {
    if (req.user) {
      req.logOut((err) => {
        if (err) {
          console.error("error during logout", err);
          return res
            .status(401)
            .json({
              success: false,
              message: "Logout failed",
              redirectUrl: "/",
            });
        }
        return res.status(200).json({
          success: true,
          message: "Logged out successfully",
          redirectUrl: "/",
        });
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No user logged in" });
    }
  });

  api.post(
    "/register",
    async (req, res, next) => {
      try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const user = await db.findOne({
          email: req.body.email,
        });

        if (user) {
          return res.status(400).json({
            success: false,
            message: "This email is already registered",
          });
        }

        const result = await db.insertOne({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          favorites: [],
        });

        if (result.insertedId) {
          return res
            .status(201)
            .json({ success: true, message: "User successfully registered" });
        } else {
          return res
            .status(500)
            .json({ success: false, message: "Failed to register user" });
        }
      } catch (err) {
        console.error("Error during registration:" + err);
        return next(err);
      }
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
      res.redirect("/");
    }
  );

  api.get("/auth", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ loggedIn: true, username: req.user.username });
    } else {
      res.json({ loggedIn: false, username: "" });
    }
  });

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    // FORSE ORA VA BENE (05/01/2025)
    const user = await db.findOne({ _id: new ObjectId(id) });
    if (!user) {
      console.error("User not found (deserialize)");
      return;
    }
    done(null, user);
  });

  //collection routes

  api.get("/", async (req, res) => {
    if (req.user) {
      let collection = req.user.favorites;
      res.status(200).send(collection);
    } else {
      let collection = [];
      res.status(200).json(collection);
    }
  });

  api.post("/", async (req, res) => {
    const { title, author, img, info, description } = req.body;

    if (!title || !info) {
      res.sendStatus(400);
    }

    const toInsert = {
      title: title,
      author: author,
      img: img,
      info: info,
      description: description,
    };

    let user = req.user;

    try {
      const result = await db.updateOne(
        { _id: user._id },
        { $addToSet: { favorites: toInsert } }
      );
      res.status(200).send(result);
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
    }
  });

  api.delete("/", async (req, res) => {
    let identifyer = req.body.info;
    let user = req.user;

    try {
      await db.updateOne(
        { _id: user._id },
        { $pull: { favorites: { info: identifyer } } }
      );
      res.status(200).send();
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
    }
  });

  api.delete("/all", async (req, res) => {
    let user = req.user;

    try {
      await db.updateOne({ _id: user._id }, { $set: { favorites: [] } });
      res.status(200).redirect("/");
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
    }
  });
});

export default api;
