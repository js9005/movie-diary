import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const fetchAllMovies = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/movies`);
      setMovieList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMovie = async (id) => {
    const res = window.confirm("Are you sure you want to delete?");
    if (res) {
      try {
        await axios.delete(`${process.env.REACT_APP_URL}/movies/${id}`);
        fetchAllMovies();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const moveToEditPage = (item) => {
    navigate(`/edit/${item.id}`, {
      state: {
        title: item.title,
        watch_date: item.watch_date,
        score: item.score,
        cover: item.cover,
      },
    });
  };
  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <div className="movie_wrap">
      {movieList.map((movie) => (
        <div className="movie_item" key={movie.id}>
          <img src={movie.cover} alt="cover" className="cover" />
          <div className="info">
            <ul>
              <li className="title">{movie.title}</li>
              <li className="watch_date">{movie.watch_date}</li>
            </ul>
            <span className="score">{movie.score}</span>
            <div className="btn_wrap">
              <Button name="EDIT" handleClick={() => moveToEditPage(movie)} />
              <Button name="DELETE" handleClick={() => deleteMovie(movie.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
