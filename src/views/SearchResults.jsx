import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchResults = () => {
  const { search } = useParams();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  const fetchBooks = async (append = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${search}&page=${page}&limit=10`
      );
      if (append) {
        setBooks([...books, ...response.data.docs]);
      } else {
        setBooks(response.data.docs);
      }
      setTotalItems(response.data.numFound);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      setPage(1);
      setBooks([]);
      fetchBooks();
    }
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      fetchBooks(true);
    }
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <SearchBar />
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
