import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Search.scss";

const Search = ({ isSearchVisible, setSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US&query=${searchValue}&page=1&include_adult=false`
    );
    const { results } = await res.json();
    setMovies(results);
  };
  useEffect(() => {
    searchValue && fetchMovies();
  }, [searchValue]);

  if (!movies) return "...finding";
  return (
    <>
      {isSearchVisible && (
        <div className="search-main">
          <div className="container">
            <div className="close" onClick={setSearch}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <h3>Search Movies</h3>
            <input
              type="search"
              placeholder="Enter movie name here"
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <div className="search-results">
              {movies.map((movie) => (
                <div className="search__item">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="poster">
                      {movie.poster_path === null ? (
                        <img
                          src={`https://via.placeholder.com/250x420`}
                          alt=""
                        />
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="info">
                      <div className="info__top">
                        <span>{movie.release_date}</span>
                        <span>{movie.vote_average}</span>
                      </div>
                      <h5>{movie.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
