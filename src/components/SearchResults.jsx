import BookCard from "../components/BookCard";

const SearchResults = ({ isLoading, books }) => {
  return (
    <div className="card-container">
      {books &&
        books.map((book, index) => <BookCard key={index} book={book} />)}
      {isLoading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default SearchResults;
