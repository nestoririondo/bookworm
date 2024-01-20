import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";import "./SearchBar.css";

const SearchBar = ({ prevQuery, clearBooks, setClearBooks }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      return;
    }
    if (prevQuery === searchInput) {
      setSearchInput("");
      return;
    }
    setClearBooks(true);
    navigate(`/search?q=${searchInput}`);
    setSearchInput("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit"><IoSearch /></button>
    </form>
  );
};

export default SearchBar;
