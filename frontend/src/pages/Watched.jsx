import React, { useEffect, useState } from "react";
import { getWatchedMovies, getRatings } from "../services/api";
import Cookies from "js-cookie";
import { Card } from "../components/Card";

export const Watched = () => {
  const [movies, setMovies] = useState([]);
  // const [ratings, setRatings] = useState([]);

  const fetchWatched = async () => {
    const moviesData = await getWatchedMovies(Cookies.get("userId"));
    const ratingsData = await getRatings(Cookies.get("userId"));
    // console.log(ratingsData)
    const ratingMap = {};
    ratingsData.forEach((rating) => {
      ratingMap[rating.movie_id] = rating.rating;
    });
    console.log(ratingMap)
    setMovies(
      moviesData.map((movie) => {
        const movieId = movie.movie_id;
        const rating = ratingMap[movieId]; // Get rating based on movie ID
        // console.log('rating', rating)
        return { ...movie, rating }; // Include rating in the movie object
      })
    );
  };

  // const fetchRatings = async () => {
    
  // };

  useEffect(() => {
    fetchWatched();
  }, []);

  return (
    <div className="watchlist-container">
      {movies.map((movie) => (
        <Card
          key={movie.movie_id}
          {...movie}
          watched={true}
        ></Card>
      ))}
    </div>
  );
};
