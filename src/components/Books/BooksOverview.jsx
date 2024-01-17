import SearchBar from "../SearchBar";
import Filter from "../Filter";
import { useState, useEffect } from "react";
import { LoadMoreButton } from "../LoadMoreButton";
import { BookList } from "./BookList";
import { queryBooks } from "../../services/openlibrary";

const fetchBooks = async (setBooks, setTotalItems, queryParams) => {
  const { docs, numFound } = await queryBooks(queryParams);

  if (!docs && !numFound) {
    console.log('Something went wrong fetching the books.');
    return;
  }

  setBooks((prevState) => [...prevState, ...docs]);
  setTotalItems(numFound);
};

export const BooksOverview = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("rating");
  

  useEffect(() => {
    // setting is loading is always a bit of a pain in the butt.
    // Don't think this is the most beautiful way, but don't really think fetchBooks should be responsible for it either.
    setIsLoading(true);
    fetchBooks(setBooks, setTotalItems, { query, page, sort }).finally(() => setIsLoading(false));
  }, [query, page, sort]);

  return <>
    <SearchBar setBooks={setBooks} currentQuery={query} />
    <Filter setSort={setSort} setBooks={setBooks} />
    <div className="search-results">
      <BookList books={books} isLoading={isLoading} />
      
      <LoadMoreButton 
        isShown={books.length < totalItems && !isLoading} 
        loadMore={() => setPage(page + 1)}
      />
    </div>
  </>
}