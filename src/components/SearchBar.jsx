import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ handleSearch }) => {

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      return;
    }
    handleSearch(searchInput);
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
