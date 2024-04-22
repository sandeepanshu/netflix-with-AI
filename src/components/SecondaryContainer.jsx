import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    // MovieList -- Popular
    //   MovieCard * n
    // MovieList -- Trending
    // MovieList -- Now Playing
    // MovieList -- Horror
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-55 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

          <MovieList title={"Trending"} movies={movies.topRatedMovies} />

          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcomming Movies"}
            movies={movies.upcommingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
