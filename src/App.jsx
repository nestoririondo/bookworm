import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
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
    setBooks([]);
    setIsLoading(true);
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <>
      <SearchBar
        handleSubmit={handleSubmit}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <div className="card-container">
        {books &&
          books.map((book, index) => <BookCard key={index} book={book} />)}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;
