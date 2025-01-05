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
  // try {
  //   const db = client.db("TheGoodReads").collection("users");

  //   // Verifica il numero di documenti nella collezione
  //   const count = await db.countDocuments();
  //   console.log(`Total documents in users collection: ${count}`);

  //   // Test findOne
  //   const user = await db.findOne({});
  //   if (user) {
  //     console.log("Database test query successful:", user);
  //   } else {
  //     console.warn("Database test query returned no results");
  //   }
  // } catch (err) {
  //   console.error("Database test query failed:", err);
  // }
  db = client.db("TheGoodReads").collection("users");

  // db.findOne({}, (err, user) => {
  //   if (err) {
  //     console.error("Database test query failed:", err);
  //   } else {
  //     console.log("Database test query successful:", user);
  //   }
  // });

  api.use(checkDbConnection);

  api.use(
    session({
      secret: process.env.SESSION_SECRET || "fallbackSecret",
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
      console.log(user);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    db.findOne({ _id: new ObjectId(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  // api.use("/", async (req, res, next) => {

  //   if (req.isAuthenticated()) {
  //     try {
  //       let user = await db.collection("users");
  //       if (!user) {
  //         console.log("User not found");
  //         res.sendStatus(404);
  //       }
  //       req.collection = user.favorites;
  //       next();
  //     } catch (err) {
  //       next(err);
  //     }
  //   } else {
  //     console.log("issue@api.js// login to save favorites");
  //     next();
  //   }
  // });

  //login routes

  api.post("/login", (req, res, next) => {
    console.log("Starting authentication");
    console.log("request body:", req.body);
    passport.authenticate("local", (err, user, info) => {
      console.log("Authentication callback triggered");
      if (err) return next(err);
      if (!user) {
        console.warn("No user found");
        return res
          .status(401)
          .json({ success: false, message: "Login failed" });
      }
      req.logIn(user, (err) => {
        console.log("Logging in user");
        if (err) return next(err);
        return res
          .status(200)
          .json({ success: true, message: "Login successful" });
      });
    })(req, res, next);
  });

  api.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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

  //collection routes

  api.get("/", async (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      let collection = req.collection || [];
      try {
        let results = await collection.find().toArray();
        res.send(results).status(200);
      } catch (err) {
        throw new Error("An error has occured. Error:" + err);
      }
    } else {
      let collection = [];
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

    let collection = req.collection;

    try {
      await collection.insertOne(toInsert);
      const result = await collection.findOne({ info: toInsert.info });
      res.status(200).send(result);
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
    }
  });

  api.delete("/", async (req, res) => {
    let identifyer = req.body.info;
    let collection = req.collection;

    try {
      const toDelete = await collection.findOne({ info: identifyer });

      if (!toDelete) {
        return res.sendStatus(404);
      } else {
        await collection.deleteOne({ _id: toDelete._id });
        res.sendStatus(204);
      }
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
    }
  });

  api.delete("/all", async (req, res) => {
    let collection = req.collection;

    try {
      const toDelete = await collection.find({}).toArray();

      if (!toDelete) {
        return res.sendStatus(404);
      } else {
        await collection.deleteMany({});
        res.sendStatus(204);
      }
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
    }
  });
});

export default api;
