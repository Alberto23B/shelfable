import express from "express";
import connection from "../db/connection.js";
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const api = express.Router();

let db;

const checkDbConnection = (req, res, next) => {
  if (!db) {
    console.log("Not connected (middleware)");
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
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  api.use(passport.initialize());
  api.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log("Local strategy start");
      const user = await db.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("Correct authentication", user);
      return done(null, user);
    })
  );

  api.use("/", async (req, res, next) => {
    console.log("Starting middleware");
    console.log(req.session.id);
    if (req.isAuthenticated()) {
      try {
        const userId = req.user._id;
        console.log(userId);
        const user = await db.findOne({ _id: new ObjectId(userId) });
        if (!user) {
          console.log("User not found (middleware level)");
          res.sendStatus(404);
        }
        req.user = user;
        console.log("User found (middleware level)");
        next();
      } catch (err) {
        next(err);
      }
    } else {
      console.log("login to save favorites (middleware level)");
      next();
    }
  });

  //login routes

  api.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      console.log("Authentication callback triggered");
      if (err) return next(err);
      if (!user) {
        console.error("No user found");
        return res
          .status(401)
          .json({ success: false, message: "Login failed" });
      }
      req.logIn(user, (err) => {
        console.log("Logging in user");
        if (err) {
          return next(err);
        }
        console.log("Login successful");
        return res
          .status(200)
          .json({ success: true, message: "Login successful" });
      });
    })(req, res, next);
  });

  api.get("/logout", (req, res) => {
    console.log("Logging out user");
    req.logOut((err) => {
      if (err) {
        console.error("error during logout", err);
        return res
          .status(401)
          .json({ success: false, message: "Logout failed" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
    });
  });

  api.post(
    "/register",
    async (req, res, next) => {
      try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const user = await db.findOne({
          username: req.body.username,
          email: req.body.email,
        });

        if (user) {
          console.log("User found");
          return res
            .status(200)
            .json({ found: true, message: "User already exists" });
        }

        console.log("user not found, insert");

        const result = await db.insertOne({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          favorites: [],
        });

        if (result.insertedId) {
          console.log("user added to the db");
          return res
            .status(201)
            .json({ found: false, message: "User successfully registered" });
        } else {
          return res
            .status(500)
            .json({ found: false, message: "Failed to register user" });
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

  passport.serializeUser((user, done) => {
    console.log("serializing User");
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    // FORSE ORA VA BENE (05/01/2025)
    console.log("Deserializing user");
    const user = await db.findOne({ _id: new ObjectId(id) });
    if (!user) {
      console.log("User not found (deserialize)");
      return;
    }
    console.log(user);
    done(null, user);
  });

  //collection routes

  api.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
      let user = req.user;
      try {
        let results = user.favorites;
        console.log(results);
        console.log("Session authenticated");
        res.send(results).status(200);
      } catch (err) {
        throw new Error("An error has occured. Error:" + err);
      }
    } else {
      let collection = [];
      console.log("Session not authenticated");
      res.send(collection).status(200);
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
      res.status(200);
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
