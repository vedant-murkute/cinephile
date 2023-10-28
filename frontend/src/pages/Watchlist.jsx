import React, { useEffect, useState } from "react";
import { getWatchlist } from "../services/api";
import Cookies from "js-cookie";
import { Card } from "../components/Card";

export const Watchlist = () => {
  const [movies, setMovies] = useState([]);

  const fetchWatchlist = async () => {
    const data = await getWatchlist(Cookies.get("userId"));
    setMovies(data);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className='watchlist-container'>
      {movies.map((movie) => (
        <Card key={movie.movie_id} {...movie} watchlist={true}></Card>
      ))}
    </div>
  );
};
