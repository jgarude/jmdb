import React, { useContext } from "react";
import { MovieContext } from "../../MovieContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.scss";

const Sidebar = ({
  onClickPopularMovies,
  onClickUpComing,
  onClickTopRated,
  onClickNowPlaying,
}) => {
  const { activeLink, setActiveLink } = useContext(MovieContext);
  const { hiddenMenu, setHiddenMenu } = useContext(MovieContext);
  const showNav = () => {
    setHiddenMenu(false);
  };
  const hideNav = () => {
    setHiddenMenu(true);
  };
  return (
    <>
      <div className="mobile-nav" onClick={showNav}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={hiddenMenu ? "sidebar" : "sidebar visible"}>
        <FontAwesomeIcon icon={faTimes} onClick={hideNav} />
        <div className="user">
          <div className="user__avatar">
            <img src="https://via.placeholder.com/150" alt="" />
          </div>
          <div className="user__name">John Doe</div>
        </div>
        <ul>
          <li
            onClick={() => {
              onClickPopularMovies();
              setActiveLink("Popular");
              setHiddenMenu(true);
            }}
            className={activeLink === "Popular" ? "active" : ""}
          >
            <span>Popular</span>
          </li>
          <li
            onClick={() => {
              onClickNowPlaying();
              setActiveLink("Now Playing");
              setHiddenMenu(true);
            }}
            className={activeLink === "Now Playing" ? "active" : ""}
          >
            <span>Now Playing</span>
          </li>

          <li
            onClick={() => {
              onClickTopRated();
              setActiveLink("Top rated");
              setHiddenMenu(true);
            }}
            className={activeLink === "Top rated" ? "active" : ""}
          >
            <span>Top rated</span>
          </li>
          <li
            onClick={() => {
              onClickUpComing();
              setActiveLink("Upcoming");
              setHiddenMenu(true);
            }}
            className={activeLink === "Upcoming" ? "active" : ""}
          >
            <span>Upcoming</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
