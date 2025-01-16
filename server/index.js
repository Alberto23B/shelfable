import express from "express";
import session from "express-session";
import cors from "cors";
import api from "./routes/api.js";

const PORT = process.env.port || 5050;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000,
    },
  })
);

app.use((req, res, next) => {
  console.log(req.path);
  console.log(req.session);
  console.log("Session ID:", req.sessionID);
  console.log("-------------------");
  next();
});

app.get("/", (req, res) => res.send("Server landing page"));

app.use("/api", api);

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
