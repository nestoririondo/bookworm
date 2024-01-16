import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("rating");

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=10&sort=${sort}`
      );
      setBooks((prevState) => [...prevState, ...response.data.docs]);
      console.log(response.data.docs);
      setTotalItems(response.data.numFound);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query, page, sort]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (query) => {
    setBooks([]);
    navigate(`/search?q=${query}`);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <Filter setSort={setSort} setBooks={setBooks} />
      <div className="search-results">
        <div className="card-container">
          {books && (
            <>
              {books.map((book) => (
                <BookCard key={book.key} book={book} />
              ))}
            </>
          )}
          {isLoading && <div className="loading">Loading...</div>}
          {!isLoading && books.length === 0 && (
            <div className="no-data">No data</div>
          )}
        </div>
        {books.length < totalItems && !isLoading ? (
          <button className="load-more-btn" onClick={loadMore}>
            Load more
          </button>
        ) : null}
      </div>
    </>
  );
};

export default SearchResults;
