import React, { useEffect, useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { addToWatched, addToWatchlist } from "../services/api";
import Cookies from "js-cookie";
import { AiFillStar } from "react-icons/ai";
import { rateMovie } from "../services/api";
import { IoIosAddCircleOutline } from "react-icons/io";

export const Card = ({
  movie_id,
  title,
  genre,
  director,
  plot,
  poster,
  watched = false,
  watchlist = false,
  rating,
  released,
}) => {
  const [ratingState, setRatingState] = useState(rating || null);
  // const [watchedState, setWatchedState] = useState(watched);
  // const [wachlistState, setWatchlistState] = useState(wachlist);

  const userId = Cookies.get("userId");

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(userId, movie_id);
      // setWatchlistState(true);
    } catch (err) {
      console.log("cant add to watchlist", err);
    }
  };

  const handleAddToWatched = async () => {
    try {
      // setWatchedState(true);
      await addToWatched(userId, movie_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRateMovie = async (stars) => {
    try {
      const userId = Cookies.get("userId");
      setRatingState(stars);
      await rateMovie(userId, movie_id, stars);
      console.log("Movie rated successfully!");
    } catch (err) {
      console.error("Failed to rate movie", err);
    }
  };

  return (
    <div className="card">
      <div
        style={{
          position: "relative",
          height: 200,
          width: 200,
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img className={{}} src={poster} alt={title}/> */}
        <span
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 100,
            color: "white",
          }}
        >
          {released}
        </span>
      </div>

      <div className="details">
        <h2>{title}</h2>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Director:</strong> {director}
        </p>
        <p>
          <strong>Plot:</strong> {plot}
        </p>
        {/* user's rating */}
        {watched && (
          <div className="rating">
            <strong>Rating:</strong>{" "}
            {ratingState !== null
              ? Array.from(Array(ratingState)).map((_, index) => (
                  <AiFillStar key={index} color="#FFD700" />
                ))
              : "Not rated yet"}
          </div>
        )}
      </div>
      <div className="card-action">
        {!watchlist && (
          <BiSolidAddToQueue
            title="Add to  Watchlist"
            onClick={handleAddToWatchlist}
            style={{ cursor: "pointer", marginRight: 30 }}
            size={"30"}
          ></BiSolidAddToQueue>
        )}
        {!watched && (
          <IoIosAddCircleOutline
            title="Add to Watched Movies"
            onClick={handleAddToWatched}
            style={{ cursor: "pointer" }}
            size={"30"}
          ></IoIosAddCircleOutline>
        )}
        {/* stars for rating */}
        {watched && (
          <>
            {[1, 2, 3, 4, 5].map((star) => (
              <AiFillStar
                key={star}
                style={{ cursor: "pointer" }}
                size={25}
                color={ratingState >= star ? "#FFD700" : "#ccc"}
                onClick={() => handleRateMovie(star)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
