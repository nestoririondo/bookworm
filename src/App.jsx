import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [maxResults, setMaxResults] = useState(15);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 500
    ) {
      setMaxResults(maxResults + 15);
    }
  }, [maxResults]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://openlibrary.org/search.json?q=${searchTerm}&limit=${maxResults}`
      )
      .then((response) => {
        setBooks(response.data.docs);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [searchTerm, maxResults]);

  const handleSubmit = (e, term) => {
    e.preventDefault();
    setBooks([]);
    setIsLoading(true);
    setSearchTerm(term);
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <SearchResults books={books} isLoading={isLoading} />
    </>
  );
}

export default App;
