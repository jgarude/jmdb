import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./MovieCard.scss";

const MovieCard = ({ movies, onclick }) => {
  console.log("from movie card", movies);
  return (
    <>
      {!movies ? (
        <Loader />
      ) : (
        <div className="movies">
          {movies.map((movie) => (
            <div className="movie" key={movie.id} onClick={onclick}>
              <Link to={`/movie/${movie.id}`}>
                <div className="movie__photo">
                  {movie.poster_path === null ? (
                    <img src={`https://via.placeholder.com/500x750`} alt="" />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="rating">
                  <span>{movie.vote_average}</span>
                </div>

                <div className="movie__desc">
                  <h5>{movie.title}</h5>
                  <span>Release date: {movie.release_date}</span>
                  {/* <p>
              {movie.overview.length > 100 ? (
                <>
                  {" "}
                  {movie.overview.substring(0, 90)} ...
                  <Link to={`/movie/${movie.id}`}>read more</Link>
                </>
              ) : (
                movie.overview
              )}
            </p> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MovieCard;
