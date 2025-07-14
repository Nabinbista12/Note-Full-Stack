import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import { connect } from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import cookieRouter from "./routes/cookie.routes.js";

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    // origin: "https://notefrontend-vp84.onrender.com",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));

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

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in Mongo SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/cookie", cookieRouter);

app.get("/", (req, res) => {
  res.send("working");
});

const start = async () => {
  app.listen(port, () => {
    console.log(`listening at the port ${port}.`);
  });
};

start();
