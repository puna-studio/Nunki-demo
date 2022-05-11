import "./selections.scss";
import { Header } from "../../components/header/Header";

export const Selections = () => {
  const selections = [
    {
      name: "favoritos",
      id: 1,
      movies: [1, 2, 3, 4, 5],
    },
    {
      name: "Clasicas",
      id: 2,
      movies: [1, 2, 3, 4, 5],
    },
    {
      name: "Terror",
      id: 3,
      movies: [1, 2, 3, 4, 5],
    },
    {
      name: "Otras",
      id: 4,
      movies: [1, 2, 3, 4, 5],
    },
  ];

  return (
    <div className="selections-wrapper">
      <Header />
      {selections.map((selection: any) => (
        <div className="selection">
          <h2>{selection.name}</h2>
          <ol className="grid">
            {selection.movies.map((movie: any) => (
              <li>
                <p>{movie}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};
