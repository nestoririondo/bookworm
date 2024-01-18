import { OPENLIBRARY_BASE_URL } from "../../constants/openlibrary";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import Results from "../Search/Results";

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

const Search = ({ query }) => {
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
      <div className="body">
        <SearchBar prevQuery={query} onSearch={() => setBooks([])} />
        <Filter setSort={setSort} setBooks={setBooks} />
        <Results
          books={books}
          isLoading={isLoading}
          totalItems={totalItems}
          setPage={setPage}
          page={page}
          query={query}
        />
      </div>
    </>
  );
};

export default Search;
