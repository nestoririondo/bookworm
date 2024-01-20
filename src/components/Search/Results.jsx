import { OPENLIBRARY_BASE_URL } from "../../constants/openlibrary";
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import LoadMoreButton from "./LoadMoreButton";
import BookCard from "../BookCard/BookCard";
import "./Results.css";

const fetchBooks = async (
  setBooks,
  setTotalItems,
  setIsLoading,
  queryParams
) => {
  setIsLoading(true);
  try {
    const response = await axios.get(
      `${OPENLIBRARY_BASE_URL}/search.json?q=${queryParams.query}&page=${queryParams.page}&limit=10&sort=${queryParams.sort}`
    );
    setBooks((prevState) => [...prevState, ...response.data.docs]);
    console.log(response.data.docs);
    setTotalItems(response.data.numFound);
    console.log("Total items:", response.data.numFound);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

const Results = ({ query, clearBooks, setClearBooks }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("rating");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (clearBooks) {
      setBooks([]);
      setClearBooks(false);
    }
    fetchBooks(setBooks, setTotalItems, setIsLoading, { query, page, sort });
  }, [query, page, sort]);

  return (
    <div className="body">
      <div className="search-above">
        {books.length > 0 && (
          <div className="results-query">
            Search results for <span>{query}</span>
          </div>
        )}
        <span></span>
        <Filter setSort={setSort} setBooks={setBooks} />
      </div>
      <div className="search-results">
        <div className="card-container">
          {books && (
            <>
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  setFavorites={setFavorites}
                  favorites={favorites}
                />
              ))}
            </>
          )}
          {isLoading && <div className="loading">Loading...</div>}
          {!isLoading && books.length === 0 && (
            <div className="no-data">No data</div>
          )}
        </div>
        <LoadMoreButton
          isShown={books.length < totalItems && !isLoading}
          loadMore={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
};

export default Results;
