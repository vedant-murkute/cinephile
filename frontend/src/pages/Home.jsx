import React, { useEffect, useState } from "react";
import { Searchbar } from "../components/Searchbar";
import MovieList from "../components/MovieList";
import "./layout.css";
import { fetchAllMovies } from "../services/api";
import { searchMovies } from "../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MovieList2 } from "../components/MovieList2";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  
  useEffect(() => {
    const userId = Cookies.get('userId');

    if (!userId) {
      // Redirect to the login page if user ID is missing
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage,itemsPerPage);
  }, [currentPage]);

  const fetchMovies = async (currentPage, itemsPerPage) => {
    try {
      const movieData = await fetchAllMovies(currentPage, itemsPerPage = 10);
      console.log(movieData)
      setMovies(movieData.movies);
      setTotalPages(Math.ceil(movieData.count[0].total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      const searchResults = await searchMovies(searchQuery, currentPage, itemsPerPage);
      // console.log(searchResults)
      setMovies(searchResults.movies);
      setTotalPages(Math.ceil(searchResults.count / itemsPerPage));
      // Reset pagination when search is performed
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="home-container">
      <Searchbar handleSearch={handleSearch}></Searchbar>
      <MovieList
        movies={movies}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></MovieList>
      {/* <MovieList2></MovieList2> */}
    </div>
  );
};
