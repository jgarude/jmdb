import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./Navbar.scss";
import Search from "../Search/Search";
import { MovieContext } from "../../MovieContext";

const Navbar = () => {
  const [isSearchVisible, setSearchVisibility] = useState(false);
  const { hiddenMenu, setHiddenMenu } = useContext(MovieContext);
  const hideSearch = () => {
    setSearchVisibility(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="search">
          <div className="search__icon">
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => {
                setSearchVisibility(true);
              }}
            />
          </div>
        </div>
      </div>
      <Search isSearchVisible={isSearchVisible} setSearch={hideSearch} />
    </>
  );
};

export default Navbar;
