import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <div class="Spinner-inner">
        <div class="Spinner-bounce1"></div>
        <div class="Spinner-bounce2"></div>
      </div>
      <h3>Loading please wait...</h3>
    </div>
  );
};

export default Loader;
