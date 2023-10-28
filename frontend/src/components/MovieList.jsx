import React, { useState, useEffect } from 'react';
import { Card } from './Card';

const MovieList = ({ movies, currentPage, setCurrentPage, totalPages, watched, inWatchlist }) => {
  
  return (
    <div className="movie-list-container">
      {movies.length === 0 ? (
        <div className="no-movies-message">No movies found matching your search criteria.</div>
      ) : (
        <>
          {movies.map((movie, index) => (
            <Card key={movie.movie_id} {...movie} />
          ))}

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;