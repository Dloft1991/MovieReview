import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setMovieReview] = useState("");
  const [movieReviewList, setMovieList] = useState([","]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("https://mysql-deploy-movieapp.herokuapp.com/api/get").then(
      (response) => {
        setMovieList(response.data);
      }
    );
  });

  const submitReview = () => {
    console.log("CLICKED");

    Axios.post("https://mysql-deploy-movieapp.herokuapp.com/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then((response) => {
      setMovieList(response.data);

      //   [
      //   ...movieReviewList,
      //   { movieName: movieName, movieReview: review },
      // ]);
    });
  };

  const deleteReview = (movie) => {
    Axios.delete(
      `https://mysql-deploy-movieapp.herokuapp.com/api/delete/${movie}`
    );
  };

  const updateReview = (movie) => {
    Axios.put("https://mysql-deploy-movieapp.herokuapp.com/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>Movie Reviews</h1>
      <div className="form">
        <input
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          name="review"
          onChange={(e) => setMovieReview(e.target.value)}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList(() => {
          return (
            <div className="card">
              <h1> {movieReviewList.movieName}</h1>
              <p> {movieReviewList.movieReview}</p>
              <button
                onClick={() => {
                  deleteReview(movieReviewList.movieName);
                }}
              >
                Delete
              </button>

              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
