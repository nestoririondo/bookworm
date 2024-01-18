import LoadMoreButton from "../LoadMoreButtons/LoadMoreButton";
import BookCard from "../BookCard/BookCard";
import "./Results.css";

const Results = ({ books, isLoading, totalItems, setPage, page, query }) => {
  return (
    <div className="search-results">
      {books.length > 0 && <div className="results-query">Search results for <span>{query}</span></div>}
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
  );
};

export default Results;
