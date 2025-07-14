import httpStatus from "http-status";
import Note from "../models/note.model.js";
import User from "../models/user.model.js";

const getAllNotes = async (req, res) => {
  let userId = req.session.userId;
  // console.log(req.session);

  // console.log(userId);
  // console.log("Working");

  if (!userId) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "User not found, please login" });
  }

  try {
    const notes = await Note.find({ userId: userId });
    const user = await User.findById(userId);
    return res.status(httpStatus.OK).json({ notes, user });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error, please try again." });
  }
};

const createNote = async (req, res) => {
  let userId = req.session.userId;
  try {
    const { title, notes } = req.body;
    const result = await Note.create({ title, notes, userId });
    console.log(result);
    res.status(httpStatus.OK).json({ message: "Note is created." });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error, please try again." });
  }
};

const viewNote = async (req, res) => {
  const userId = req.session.userId;
  const noteId = req.params.id;

  if (!userId || !noteId) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({
        message: userId
          ? "User not found, please try again."
          : "The note doesn't exist.",
      });
  }

  try {
    const notes = await Note.findById(noteId).populate("notes");
    const user = await User.findById(userId);
    return res.status(httpStatus.OK).json({ notes, user });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error, please try again." });
  }
};

const editNote = async (req, res) => {
  const userId = req.session.userId;
  const noteId = req.params.id;

  if (!userId || !noteId) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({
        message: userId
          ? "User not found, please try again."
          : "The note doesn't exist.",
      });
  }

  try {
    const { title, notes } = req.body;
    const updatedAt = Date.now();
    const result = await Note.findByIdAndUpdate(
      noteId,
      { title, notes, updatedAt },
      { new: true }
    );
    console.log(result);
    return res.status(httpStatus.OK).json({ message: "Note is updated" });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error, please try again." });
  }
};

const deleteNote = async (req, res) => {
  const userId = req.session.userId;
  const noteId = req.params.id;

  if (!userId || !noteId) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({
        message: userId
          ? "User not found, please try again."
          : "The note doesn't exist.",
      });
  }

  try {
    const result = await Note.findByIdAndDelete(noteId);
    console.log(result);
    return res.status(httpStatus.OK).json({ message: "Note is deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error, please try again." });
  }
};

export { getAllNotes, createNote, viewNote, editNote, deleteNote };
