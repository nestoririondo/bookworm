import { useNavigate } from "react-router-dom";
import { useState } from "react";

const handleSearch = (query, setBooks, navigate) => {
  setBooks([]);
  navigate(`/search?q=${query}`);
};

const SearchBar = ({ setBooks }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) return;

    handleSearch(searchInput, setBooks, navigate);
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
