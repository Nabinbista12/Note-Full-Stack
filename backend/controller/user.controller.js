import httpStatus from "http-status";
import bcrypt from "bcrypt";

import User from "../models/user.model.js";

const register = async (req, res) => {
  let { name, username, email, password } = req.body;

  try {
    let userName = await User.findOne({ username: username });
    let userEmail = await User.findOne({ email: email });

    if (userName || userEmail) {
      return res.status(httpStatus.CONFLICT).json({
        message: userName
          ? "username is already taken."
          : "email is already taken.",
      });
    }

    password = await bcrypt.hash(password, 10);

    let user = new User({ name, username, email, password });
    let result = await user.save();

    req.session.userId = result.id;
    req.session.username = result.username;

    // console.log(result);
    // res
    //   .status(httpStatus.OK)
    //   .json({ message: "User is saved", username: result.username });

    req.session.save((err) => {
      if (err) {
        console.log("Session save error:", err);
        return res.status(500).json({ message: "Failed to save session." });
      }

      return res
        .status(httpStatus.OK)
        .json({ message: "Welcome to the page.", username: user.username });
    });
  } catch (err) {
    console.log(err);
    if (err.name == "ValidationError") {
      const error = Object.values(err.errors)[0].message;
      return res.status(httpStatus.BAD_REQUEST).json({ message: error });
    }

    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  let email, username, password;

  try {
    if (req.body.username) {
      ({ username, password } = req.body);
    } else if (req.body.email) {
      ({ email, password } = req.body);
    }
    let user;
    if (username) {
      user = await User.findOne({ username: username });
    } else if (email) {
      user = await User.findOne({ email: email });
    }

    if (user) {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Wrong password. Please Enter correct password." });
      }

      req.session.isAuthenticated = true;
      req.session.userId = user._id;
      req.session.username = user.username;
      console.log(req.session);
      // return res
      // .status(httpStatus.OK)
      // .json({ message: "Welcome to the page.", username: user.username });
      req.session.save((err) => {
        if (err) {
          console.log("Session save error:", err);
          return res.status(500).json({ message: "Failed to save session." });
        }

        return res
          .status(httpStatus.OK)
          .json({
            message: "Welcome to the page.",
            username: user.username,
            userId: user.id,
          });
      });
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Inter server error." });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while deleting the session:", err);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Logout failed." });
    }
    res.clearCookie("connect.sid");
    return res.status(httpStatus.OK).json({ message: "Successfully logout." });
  });
};

export { register, login, logout };
