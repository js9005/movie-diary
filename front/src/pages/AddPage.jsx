import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import "./FormWrap.css";

function AddPage() {
  const navigate = useNavigate();
  const [newMovie, setNewMovie] = useState({
    title: "",
    watch_date: "",
    score: null,
    cover: "",
  });
  const handleChange = (e) => {
    setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addMovie = async () => {
    if (!newMovie.title || !newMovie.watch_date || !newMovie.score) {
      alert("title, watch_date, score required!");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_URL}/movies`, newMovie);
      alert("Added Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form_wrap">
      <h2>Add New Movie</h2>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="watch_date"
        name="watch_date"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="score"
        name="score"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <div className="btn_wrap">
        <Button name="ADD" handleClick={addMovie} />
      </div>
    </div>
  );
}

export default AddPage;
