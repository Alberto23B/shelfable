import express from "express";

import db from "../db/connection.js";

const api = express.Router();

api.use("/", async (req, res, next) => {
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
});

api.get("/", async (req, res) => {
  let collection = req.collection;
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

export default api;
