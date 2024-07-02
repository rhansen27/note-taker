const { readFile, writeFile } = require("fs/promises");
const path = require(path);

const dbpath = path.join(__dirname, "..", "db", "db.json");

const readNotes = async () => {
  const notesContent = await readFile(dbpath, "utf-8");
  const notes = JSON.parse(notesContent);

  return notes;
};

const writeNotes = async (notes) => {
  return await writeFile(dbpath, JSON.stringify(notes));
};

module.export = { readNotes, writeNotes };
