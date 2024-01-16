import BookCard from "./BookCard";

export const BookList = ({ books, isLoading }) => {
  return (
    <>
      <div className="card-container">
        {/*
          Its easier to read all the options if you do it in this order.
          You can mentally go over all the edge cases and then you get the happy path.
        */}
        {isLoading && <div className="loading">Loading...</div>}

        {!isLoading && !books.length && (
          <div className="no-data">No data</div>
        )}

        {books && (
          <>
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </>
        )}
      </div>
    </>
  );
}