const BookCard = ({ book }) => {
  const thumbnail = book.cover_i
    ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x200";

  return (
    <>
      <div className="card">
        <img src={thumbnail} alt={book.title} />
        <p>{book.title}</p>
      </div>
    </>
  );
};

export default BookCard;
