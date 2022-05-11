import { useEffect, useState } from "react";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { Grid } from "../../components/grid/Grid";
import "./home.scss";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [movies, setMovies] = useState([]);

  function getMovies(movies: any) {
    setMovies(movies);
  }

  // function handleTitleChange(evt) {
  //   setTitle(evt.target.value);
  // }

  useEffect(() => {
    console.log("hola");
  }, [count]);
  
  return (
    <div className="home">
      <div className="wrapper">
        <div className="input-wrapper">
        <SearchBar movies={getMovies} />
        </div>
   
      {movies && <Grid movies={movies} />}
      </div>

    </div>
  );
};
