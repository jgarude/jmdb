import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import "./MovieDetail.scss";
import Loader from "../Loader/Loader";
const MovieDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const fetchMovie = async () => {
    setLoading(true);
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US
        `);
    const movie = await res.json();
    console.log(detail);
    setDetail(movie);
    setLoading(false);
  };
  const fetchSimilarMovie = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US&page=1`
    );
    const { results } = await res.json();
    setSimilarMovies(results);
    console.log("similar movies", similarMovies);
    setLoading(false);
  };
  const scrollToTOp = () => {
    window.scroll(0, 0);
  };
  useEffect(() => {
    fetchMovie();
  }, [detail]);

  useEffect(() => {
    fetchSimilarMovie();
  }, []);

  if (!detail.genres) return <Loader />;

  return (
    <>
      <div className="container-fluid movie-details">
        <div className="banner">
          <img
            src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
            alt=""
          />
          <div className="bg-overlay"></div>
          <div className="bg-highlight"></div>
        </div>
      </div>
      <div className="movie-details__hero">
        <div className="content">
          <div className="details">
            <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt=""
              />
              <span>{detail.status}</span>
            </div>
            <div className="moviedetails">
              <h2>{detail.title}</h2>
              <div className="ratings">
                <span>{detail.vote_average}%</span>{" "}
                <span>
                  <FontAwesomeIcon icon={faClock} />
                  {Math.floor(detail.runtime / 60)} hr{"  "}&nbsp;
                  {Math.floor(detail.runtime % 60)} mins
                </span>
              </div>
              <p>{detail.overview}</p>
              <div className="more-details">
                <ul>
                  {detail.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <ul>
                  {detail.spoken_languages.map((lang) => (
                    <li key={lang.id}>{lang.name}</li>
                  ))}
                </ul>
              </div>
              {detail.homepage && (
                <a
                  href={detail.homepage}
                  target="_blank"
                  className="btn-default"
                >
                  Watch Now
                </a>
              )}
            </div>
          </div>
          <div className="goback">
            <Link to="/">
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="similar container ">
        <h3 className="border-bottom1px">You may also like</h3>
        <div className=""></div>
        <MovieCard movies={similarMovies} onclick={scrollToTOp} />
      </div>
    </>
  );
};

export default MovieDetail;
