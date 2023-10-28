import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (username, email) => {
  try {
    const response = await api.post(`/users/create`, {username, email});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query, page, pageSize) => {
  try {
    const response = await api.get(`/movies/search?q=${query}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllMovies = async (page, pageSize) => {
  try {
    const response = await api.get(`/movies/?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToWatchlist = async (userId, movieId) => {
  try {
    const response = await api.post(`/movies/watchlist/${userId}`,{movieId});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWatchlist = async (userId) => {
  try {
    const response = await api.get(`/movies/watchlist/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToWatched = async (userId, movieId) => {
  try {
    const response = await api.post(`/movies/watched/${userId}`,{movieId});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWatchedMovies = async (userId) => {
  try {
    const response = await api.get(`/movies/watched/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const rateMovie = async (userId, movieId, rating) => {
  try {
    const response = await api.post(`/movies/rate/${userId}`, {movieId, rating});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRatings = async (userId) => {
  try {
    const response = await api.get(`/movies/rate/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
