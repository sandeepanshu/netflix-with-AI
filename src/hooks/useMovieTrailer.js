import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  // fetch the trailor video of movie && updating the store with trailer video data
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    const filterTrailer = json.results.filter(
      (video) => video.type === "Trailer"
    );

    const trailer = filterTrailer.length ? filterTrailer[0] : null;

    console.log(trailer);
    // console.log(trailer.key);
    // console.log(trailerId);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
  //  console.log(trailerId);
};

export default useMovieTrailer;
