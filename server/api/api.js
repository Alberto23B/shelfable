import express from "express";

import db from "../db/connection.js";

const api = express.Router();

api.get("/", async (req, res) => {
  let collection = await db.collection("favorites");
  if (!collection) {
    res.sendStatus(404);
  } else {
    let results = await collection.find().toArray();
    res.send(results).status(200);
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

  let collection = await db.collection("favorites");

  if (!collection) {
    res.sendStatus(404);
  } else {
    await collection.insertOne(toInsert);
    const result = await collection.findOne({ info: toInsert.info });
    res.status(200).send(result);
  }
});

api.delete("/", async (req, res) => {
  let identifyer = req.body.info;
  let collection = await db.collection("favorites");

  if (!collection) {
    return res.sendStatus(400);
  }

  const toDelete = await collection.findOne({ info: identifyer });

  if (!toDelete) {
    return res.sendStatus(404);
  } else {
    await collection.deleteOne({ _id: toDelete._id });
    res.sendStatus(204);
  }
});

export default api;
