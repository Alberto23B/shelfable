import express from "express";
import session from "express-session";
import cors from "cors";
import api from "./routes/api.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.render("Server landing page"));

app.use("/api", api);

if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION MODE ACTIVE");
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
