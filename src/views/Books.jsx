import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import LoadMoreButton from "../components/LoadMoreButton";
import { OPENLIBRARY_BASE_URL } from "../constants/openlibrary";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("rating");

  useEffect(() => {
    fetchBooks(setBooks, setTotalItems, setIsLoading, { query, page, sort });
  }, [query, page, sort]);

  return (
    <>
      <SearchBar onSearch={()=>setBooks([])} />
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
        <LoadMoreButton
          isShown={books.length < totalItems && !isLoading}
          loadMore={() => setPage(page + 1)}
        />
      </div>
    </>
  );
};

export default SearchResults;
