import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebouce";

export const SearchBar = (props: any) => {
  const [searchText, setSearchtext] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  const debouncedText = useDebounce(searchText, 300);

  useEffect(() => {
    fetch(
      endpoint! + "search/movie?api_key=" + apiKey + "&query=" + debouncedText
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.movies(data.results);
      });
  }, [debouncedText]);

  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onChange={(e) => {
          const value = e.target.value;
          setSearchtext(value);
        }}
      />
    </div>
  );
};
