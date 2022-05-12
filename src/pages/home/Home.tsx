import { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { Grid } from "../../components/grid/Grid";
import { MovieModal } from "../movie-modal/MovieModal";
import "./home.scss";
import { MovieContext } from "../../context/movieProvider";
import { PlaylistModal } from "../playlist-modal/PlaylistModal";
import { Navbar } from "../../components/navbar/Navbar";

export const Home = () => {
  const [state, setState] = useContext(MovieContext);
  return (
    <div className="home">
      <Navbar />
      <div className="wrapper">
        <div className="input-wrapper">
          <SearchBar />
        </div>

        <Grid />
      </div>
      {state.movie && !state.selection && <MovieModal />}
      {state.selection && <PlaylistModal />}
    </div>
  );
};
