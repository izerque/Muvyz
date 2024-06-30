import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie && (
        <div
          className="movie-thumbnail"
          style={{backgroundImage: `url(${movie.thumbnail})`}}
        >
          <div className="movie-details">
            <h2>{movie.title}</h2>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
