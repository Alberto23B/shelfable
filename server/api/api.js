import express from "express";

import db from "../db/connection.js";

const api = express.Router();

api.get("/favorites", async (req, res) => {
  let collection = await db.collection("favorites");
  if (!collection) {
    res.sendStatus(404);
  } else {
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  }
});

export default api;
