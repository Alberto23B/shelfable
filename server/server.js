import express from "express";
import cors from "cors";
import api from "./api/api.js";

const PORT = process.env.port || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
