import dotenv from "dotenv";
dotenv.config()

import express, { urlencoded } from "express";
import { connect } from "mongoose";
import session from "express-session";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import cookieRouter from "./routes/cookie.routes.js";

const app = express();
const port = process.env.PORT;

const sessionOptions = {
  secret: "secret_token",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(session(sessionOptions));

app.use(express.json());
app.use(urlencoded({ extended: true }));

const dbUrl = process.env.DB_URL;

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

async function main() {
  // await connect("mongodb://127.0.0.1:27017/Notes");
  await connect(dbUrl);
}

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/cookie", cookieRouter)

app.get("/", (req, res) => {
  res.send("working");
});

const start = async () => {
  app.listen(port, () => {
    console.log(`listening at the port ${port}.`);
  });
};

start();
