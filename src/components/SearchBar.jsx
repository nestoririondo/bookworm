import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event, search) => {
    if (!search) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <form
      className="search-bar"
      onSubmit={(event) => handleSubmit(event, searchInput)}
    >
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
