import { useNavigate } from "react-router-dom";
import { useState } from "react";

const handleSearch = (currentQuery, newQuery, setBooks, navigate) => {
  if (currentQuery === newQuery) return;

  setBooks([]);
  navigate(`/search?q=${newQuery}`);
};

const SearchBar = ({ setBooks, currentQuery }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) return;

    handleSearch(currentQuery, searchInput, setBooks, navigate);
    setSearchInput("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for book, author, genre..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
