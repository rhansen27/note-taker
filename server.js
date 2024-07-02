const express = require("express");
const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;

const { readNotedDB, writeNotesDB } = require("./utils/write-file");

app.use(express.static("public"));
app.use(express.json());
