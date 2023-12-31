import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import "./FormWrap.css";

function EditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];
  const [newMovie, setNewMovie] = useState({
    title: location.state.title,
    watch_date: location.state.watch_date,
    score: Number(location.state.score),
    cover: location.state.cover,
  });
  const handleChange = (e) => {
    setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const editMovie = async () => {
    if (!newMovie.title || !newMovie.watch_date || !newMovie.score) {
      alert("title, watch_date, score required!");
      return;
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/movies/${movieId}`,
        newMovie
      );
      alert("Edited Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form_wrap">
      <h2>Edit Movie</h2>
      <input
        value={newMovie.title}
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <input
        value={newMovie.watch_date}
        type="text"
        placeholder="watch_date"
        name="watch_date"
        onChange={handleChange}
      />
      <input
        value={newMovie.score}
        type="number"
        placeholder="score"
        name="score"
        onChange={handleChange}
      />
      <input
        value={newMovie.cover}
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <div className="btn_wrap">
        <Button name="EDIT" handleClick={editMovie} />
      </div>
    </div>
  );
}

export default EditPage;
