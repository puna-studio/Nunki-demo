import { useContext } from "react";
import { MovieContext } from "../../context/movieProvider";
import "./playlistModal.scss";

export const PlaylistModal = () => {
  const [state, setState] = useContext(MovieContext);

  function getPlaylist() {
    const playlist = localStorage.getItem("playlist");
  }

  function createPlaylist(name: string) {
    const playlists: any = localStorage.getItem("playlist");

    for (let playlist in playlists) {
    }
  }

  return (
    <div className="modal-wrapper">
      <div
        className="modal-backdrop"
        onClick={() => {
          setState({ ...state, selection: false });
        }}
      ></div>

      <div className="selection-modal">
        <div className="input-wrapper">
          <input type="text" placeholder="Selection name" />
          <div className="add-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
            </svg>
          </div>
        </div>

        <button>Close</button>
      </div>
    </div>
  );
};
