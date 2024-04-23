import React, { useRef } from "react";
import lang from "./LanguageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constant";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  // search movie TMDB API
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    console.log(searchText.current.value);

    // Make an API call to GPT API and get the movie result.

    const gptQuery =
      "Act as a Movie recommendetion system and suggest some movies for the query" +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. example result: Salaar, Sholay, Don, Golmaal, Koi Mil gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      // TODO: Write Error Handeling
    }
    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <>
      <div className="pt-[8%] flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          action="/"
          className="bg-gray-700 w-1/2 grid grid-cols-12 rounded-lg"
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9 bg-gray-100"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3"
            onClick={handleGPTSearchClick}
          >
            {/* {lang.en.search} */}
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GPTSearchBar;
