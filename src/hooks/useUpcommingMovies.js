import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcommingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcommingMovies = () => {
  // fetch the ata from TMDB and update the store
  const dispatch = useDispatch();
  const getUpcommingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json(); 
    dispatch(addUpcommingMovies(json.results));
  };

  useEffect(() => {
    getUpcommingMovies();
  }, []);
};

export default useUpcommingMovies;
