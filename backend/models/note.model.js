import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Note = model("Note", noteSchema);
export default Note;
