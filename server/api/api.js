import express from "express";
import connection from "../db/connection.js";
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const api = express.Router();

connection(async (client) => {
  const db = await client.db("TheGoodReads");

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

  api.use("/", async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        let collection = await db.collection("favorites");
        if (!collection) {
          res.sendStatus(404);
        }
        req.collection = collection;
        next();
      } catch (err) {
        next(err);
      }
    } else {
      console.log("issue@api.js// login to save favorites");
    }
  });

  //login routes

  api.post("/login", (req, res) => {
    passport.authenticate("local", { failureRedirect: "/" }, (req, res) => {
      res.redirect("/");
    });
  });

  api.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  api.route("/register").post(
    (req, res, next) => {
      const hash = bcrypt.hashSync(req.body.password, 12);
      db.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          next(err);
        } else if (user) {
          res.redirect("/");
        } else {
          db.insertOne(
            {
              username: req.body.username,
              password: hash,
            },
            (err, doc) => {
              if (err) {
                res.redirect("/");
              } else {
                // The inserted document is held within
                // the ops property of the doc
                next(null, doc.ops[0]);
              }
            }
          );
        }
      });
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
      res.redirect("/");
    }
  );

  //collection routes

  api.get("/", async (req, res) => {
    let collection = req.collection;
    console.log(collection);
    try {
      let results = await collection.find().toArray();
      res.send(results).status(200);
    } catch (err) {
      throw new Error("An error has occured. Error:" + err);
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
});

export default api;
