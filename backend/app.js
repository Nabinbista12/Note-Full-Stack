import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connect } from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import cookieRouter from "./routes/cookie.routes.js";

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

// app.options("/*", cors({
//   origin: "https://note-full-stack-frontend.onrender.com",
//   credentials: true,
// }));

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://note-full-stack-frontend.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  ttl: 86400,
});

store.on("error", (err) => {
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
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  },
  name: "connect.sid",
};

app.use(cookieParser());
app.use(session(sessionOptions));

app.use((req, res, next) => {
  if (!req.session) {
    console.log("No session found, creating new session");
  }
  console.log("Session ID:", req.session.user_id);
  console.log("Session ID:", req.session);
  next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/cookie", cookieRouter);

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/api/v1/note/test", (req, res) => {
  res.json({ message: "Note route working!" });
});

const start = async () => {
  app.listen(port, () => {
    console.log(`listening at the port ${port}.`);
  });
};

start();
