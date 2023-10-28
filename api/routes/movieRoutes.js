const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/search', movieController.searchMovies);
router.get('/watched/:userId', movieController.getWatchedMovies);
router.get('/watchlist/:userId', movieController.getWatchlist);
router.get('/', movieController.getAllMovies);
router.get('/rate/:userId', movieController.getRatings);

router.post('/rate/:userId', movieController.rateMovie);
router.post('/watched/:userId', movieController.addToWatchedMovies);
router.post('/watchlist/:userId', movieController.addToWatchlist);

module.exports = router;