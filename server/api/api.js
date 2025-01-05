import express from "express";
import connection from "../db/connection.js";
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const api = express.Router();

connection(async (client) => {
  const db = await client.db("TheGoodReads").collection("users");

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
    new LocalStrategy((username, password, done) => {
      db.findOne({ username: username }, (err, user) => {
        console.log(`User ${username} attempted to log in.`);
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);
        return done(null, user);
      });
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
  //     next(req);
  //   }
  // });

  //login routes

  api.post("/login", (req, res) => {
    passport.authenticate("local", { failureRedirect: "/" }, (req, res) => {
      res.redirect("/");
    });
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
        const user = await db.findOne({ username: req.body.username });

        if (user) {
          console.log("User found");
          return res.redirect("/");
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
          return next();
        } else {
          return res.redirect("/");
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
