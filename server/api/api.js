import express from "express";

import db from "../db/connection.js";

const api = express.Router();

api.get("/", async (req, res) => {
  let collection = await db.collection("favorites");
  if (!collection) {
    res.sendStatus(404);
  } else {
    let results = await collection.find().toArray();
    console.log(results);
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

export default api;
