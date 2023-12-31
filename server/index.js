const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.get("/movies", (req, res) => {
  const q_str = "SELECT * FROM movie_diary";
  db.query(q_str, (err, data) => {
    if (err) return console.log(err);
    res.json(data);
  });
});

app.post("/movies", (req, res) => {
  const q_str =
    "INSERT INTO movie_diary (`title`, `watch_date`, `score`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.watch_date,
    req.body.score,
    req.body.cover,
  ];
  db.query(q_str, [values], (err, data) => {
    if (err) return console.log(err);
    res.json("Created Successfully");
  });
});

app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const q_str = "DELETE FROM movie_diary WHERE id=?";
  db.query(q_str, movieId, (err, data) => {
    if (err) return console.log(err);
    res.json("Deleted Successfully");
  });
});

app.put("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const q_str =
    "UPDATE movie_diary SET `title`=?, `watch_date`=?, `score`=?, `cover`=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.watch_date,
    req.body.score,
    req.body.cover,
  ];
  db.query(q_str, [...values, movieId], (err, data) => {
    if (err) return console.log(err);
    res.json("Updated Successfully");
  });
});

app.listen(process.env.port, () => {
  console.log("START!");
});
