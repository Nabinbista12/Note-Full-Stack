import { Router } from "express";
import { createNote, deleteNote, editNote, getAllNotes, viewNote } from "../controller/note.controller.js";

const router = Router();

router.get("/", getAllNotes);
router.post("/create", createNote);
router.get("/view/:id", viewNote);
router.patch("/view/:id/edit", editNote);
router.delete("/delete/:id", deleteNote);

export default router;