const express = require("express");
const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;

const { readNotedDB, writeNotesDB } = require("./utils/write-file");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", async (req, res) => {
  const newNote = {
    id: uuidv4(),
    ...req.body,
  };

  const notes = await readNotes();

  notes.push(newNote);
  await writeNotes(notes);
  res.status(201).json(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await readNotes();

  const filteredNotes = notes.filter((notes) => notes.id !== id);

  await writeNotes(filteredNotes);

  res.status(200).send("Seccessfully Deleted");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
