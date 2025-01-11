import express from "express";
import cors from "cors";
import api from "../routes/api.js";

const PORT = process.env.port || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", api);

app.get("/", (req, res) => res.send("Express on Vercel"));

//Error creation middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler middleware function
app.use((err, req, res, next) => {
  // Set status code and error message based on error object
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
});

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

export default app;
