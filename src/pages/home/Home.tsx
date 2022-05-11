import { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { Grid } from "../../components/grid/Grid";
import { MovieModal } from "../movie-modal/MovieModal";
import "./home.scss";
import { MovieContext } from "../../context/movieProvider";

export const Home = () => {
  const [state, setState] = useContext(MovieContext);
  return (
    <div className="home">
      <div className="wrapper">
        <div className="input-wrapper">
          <SearchBar />
        </div>

        <Grid />
      </div>
      {state.movie && <MovieModal></MovieModal>}
    </div>
  );
};
