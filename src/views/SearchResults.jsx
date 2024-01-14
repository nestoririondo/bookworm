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
  const [startIndex, setStartIndex] = useState(0);

  const fetchBooks = async (append = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}`
      );
      if (append) {
        setBooks((prevBooks) => [...prevBooks, ...response.data.items]);
      } else {
        setBooks(response.data.items);
      }
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      setBooks([]);
      setStartIndex(0);
      fetchBooks();
    }
  }, [search]);

  useEffect(() => {
    if (startIndex > 0) {
      fetchBooks(true);
    }
  }, [startIndex]);

  const loadMore = () => {
    setStartIndex(startIndex + 10);
  };
  return (
    <>
      <SearchBar />
      <div className="search-results">
        <div className="card-container">
          {books && (
            <>
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </>
          )}
          {isLoading && <div className="loading">Loading...</div>}
          {!isLoading && books.length === 0 && (
            <div className="no-data">No data</div>
          )}
          {books.length < totalItems && !isLoading ? (
            <button className="load-more-btn" onClick={loadMore}>
              Load more
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchResults;