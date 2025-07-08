import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 4,
    maxLength: 20,
    required: true,
  },
  username: {
    type: String,
    minLength: 4,
    maxLength: 20,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      [/^[a-zA-Z0-9]+[a-zA-Z0-9._+]?[a-zA-Z0-9]+[@][a-zA-Z]{2,6}\.[a-zA-Z]{2,6}/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
