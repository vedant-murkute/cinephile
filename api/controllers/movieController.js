const movieModel = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const movies = await movieModel.getAllMovies(page, pageSize);
    const count = await movieModel.getAllMoviesCount(page, pageSize);
    res.status(200).json({ movies: movies, count });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { q, page = 1, pageSize = 10 } = req.query;
    const allMovies = await movieModel.searchMovies(q);

    // Implement pagination in memory
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMovies = allMovies.slice(startIndex, endIndex);

    const count = allMovies.length;

    res.json({ movies: paginatedMovies, count });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const rateMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { movieId, rating } = req.body;

    if (!movieId || !rating || rating < 1 || rating > 10) {
      return res.status(400).json({ error: "Invalid movieId or rating" });
    }

    const message = await movieModel.rateMovie(userId, movieId, rating);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error rating movie:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRatings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const ratings = await movieModel.getRatings(userId);
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error getting ratings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWatchedMovies = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    const watchedMovies = await movieModel.getWatchedMovies(userId);
    res.status(200).json(watchedMovies);
  } catch (error) {
    console.error("Error getting watched movies:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    console.log(userId, 'userId')
    const watchlist = await movieModel.getWatchlist(userId);
    console.log(watchlist,'++++')
    res.status(200).json(watchlist);
  } catch (error) {
    console.error("Error getting watchlist movies:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToWatchedMovies = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ error: "Invalid movieId" });
    }

    const message = await movieModel.addToWatchedMovies(userId, movieId);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error adding movie to watched list:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ error: "Invalid movieId" });
    }

    const message = await movieModel.addToWatchlist(userId, movieId);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error adding movie to watch list:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMovies,
  searchMovies,
  getWatchedMovies,
  getWatchlist,
  addToWatchlist,
  addToWatchedMovies,
  rateMovie,
  getRatings
};
