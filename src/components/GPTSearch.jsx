import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestion from "./GPTMovieSuggestion";
import { BACKGROUND_IMAGE } from "../utils/constant";

const GPTSearch = () => {
  return (
    <>
      <div>
        <div className="fixed -z-10">
          <img src={BACKGROUND_IMAGE} alt="logo" />
        </div>
        <GPTSearchBar />
        <GPTMovieSuggestion />
      </div>
    </>
  );
};

export default GPTSearch;
