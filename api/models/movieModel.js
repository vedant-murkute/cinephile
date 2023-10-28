const pool = require("../database");

const getAllMovies = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize, 10);
    const queryString = "SELECT * FROM movies LIMIT ?, ?";
    const [results] = await pool.query(queryString, [offset, limit]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAllMoviesCount = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize, 10);
    const queryString = "SELECT COUNT(*) AS total FROM movies LIMIT ?, ?";
    const [results] = await pool.query(queryString, [offset, limit]);
    return results;
  } catch (error) {
    throw error;
  }
};

const searchMovies = async (searchQuery) => {
  try {
    const queryString = "SELECT * FROM movies WHERE title LIKE ?";
    const [results] = await pool.query(queryString, [`${searchQuery}%`]);
    console.log(results, "+++++", searchQuery);
    return results;
  } catch (error) {
    throw error;
  }
};

const getTotalSearchCount = async (searchQuery) => {
  const query = "SELECT COUNT(*) AS total FROM movies WHERE title LIKE ?";
  try {
    const results = await connection.query(query, [`%${searchQuery}%`]);
    return results[0].total;
  } catch (error) {
    throw error;
  }
};

const getWatchedMovies = async (userId) => {
  try {
    const queryString =
      "SELECT * FROM movies WHERE movie_id IN (SELECT movie_id FROM watched_movies WHERE user_id = ?)";
    const [results] = await pool.query(queryString, [userId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getWatchlist = async (userId) => {
  try {
    const queryString =
      "SELECT * FROM movies WHERE movie_id IN (SELECT movie_id FROM want_to_watch_movies WHERE user_id = ?)";
    const [results] = await pool.query(queryString, [userId]);
    console.log(results, "res");
    return results;
  } catch (error) {
    throw error;
  }
};

const rateMovie = async (userId, movieId, rating) => {
  try {
    const queryString =
      "INSERT INTO ratings (user_id, movie_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating)";
    // console.log(userId, movieId, rating)
    await pool.query(queryString, [userId, movieId, rating]);
    return "Rating updated successfully";
  } catch (error) {
    throw error;
  }
};

const getRatings = async (userId) => {
  try {
    const queryString = "SELECT * FROM ratings WHERE user_id = ?";
    const [ratings] = await pool.query(queryString, [userId]);
    return ratings;
  } catch (error) {
    throw error;
  }
};

const addToWatchedMovies = async (userId, movieId) => {
  try {
    const queryString =
      "INSERT INTO watched_movies (user_id, movie_id) VALUES (?, ?)";
    await pool.query(queryString, [userId, movieId]);
    return "Movie added to watched list";
  } catch (error) {
    throw error;
  }
};

const addToWatchlist = async (userId, movieId) => {
  try {
    const queryString =
      "INSERT INTO want_to_watch_movies (user_id, movie_id) VALUES (?, ?)";
    await pool.query(queryString, [userId, movieId]);
    return "Movie added to want-to-watch list";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMovies,
  getAllMoviesCount,
  searchMovies,
  getTotalSearchCount,
  getWatchlist,
  getWatchedMovies,
  addToWatchlist,
  addToWatchedMovies,
  rateMovie,
  getRatings
};
