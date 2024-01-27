import React from "react";
import Filter from "./Filter";

function TopRow({ query, setSort, setBooks, books }) {
  return (
    <div className="search-above">
      {books && books.length > 0 && (
        <div className="results-query">
          Search results for <span>{query}</span>
        </div>
      )}
      <span></span>
      <Filter setSort={setSort} setBooks={setBooks} />
    </div>
  );
}

export default TopRow;
