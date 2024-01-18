import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      return;
    }
    if (onSearch) onSearch();
    navigate(`/search?q=${searchInput}`);
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
