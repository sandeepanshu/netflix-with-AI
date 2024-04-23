import React from "react";
import lang from "./LanguageConstant";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <>
      <div className="pt-[8%] flex justify-center">
        <form
          action="/"
          className="bg-gray-700 w-1/2 grid grid-cols-12 rounded-lg"
        >
          <input
            type="text"
            className="p-4 m-4 col-span-9 bg-gray-100"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button className="py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3">
            {/* {lang.en.search} */}
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GPTSearchBar;
