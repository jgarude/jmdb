import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Loader from "./components/Loader/Loader";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import { MovieSate } from "./MovieContext";

function App() {
  const [loader, setLoader] = useState(true);
  const [movies, setMovies] = useState([]);

  const fetchNowPlaying = async () => {
    setLoader(true);
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US&page=1"
    );
    const { results } = await res.json();
    setMovies(results);
    setLoader(false);
  };

  const fetchTopRatedMovies = async () => {
    setLoader(true);
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US&page=1"
    );
    const { results } = await res.json();
    setMovies(results);
    setLoader(false);
  };

  const fetchUpcomingMovies = async () => {
    setLoader(true);
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US&page=1"
    );
    const { results } = await res.json();
    setMovies(results);
    setLoader(false);
  };
  const fetchPopularMovies = async () => {
    setLoader(true);
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=a3ce369b66dd62cacdb97da64e78746e&language=en-US&page=1"
    );
    const { results } = await res.json();

    setMovies(results);
    setLoader(false);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);
  return (
    <MovieSate>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Navbar />
              <div className="content">
                <Sidebar
                  onClickPopularMovies={fetchPopularMovies}
                  onClickUpComing={fetchUpcomingMovies}
                  onClickTopRated={fetchTopRatedMovies}
                  onClickNowPlaying={fetchNowPlaying}
                />
                {!loader ? <MovieCard movies={movies} /> : <Loader />}
              </div>
            </Route>

            <Route exact path="/movie/:id">
              <MovieDetail />
            </Route>
          </Switch>
        </div>
      </Router>
    </MovieSate>
  );
}

export default App;
