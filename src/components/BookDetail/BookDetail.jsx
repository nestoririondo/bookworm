import { addTrailingDots } from "../../utils/string";
import { getYear } from "../../utils/string";
import { useNavigate } from "react-router-dom";
import "./BookDetail.css";

const BookDetail = ({ book, author }) => {
  const navigate = useNavigate();

  let year =
    book && book.first_publish_date ? getYear(book.first_publish_date) : "";

  let description = "No description available";

  if (book && book.description) {
    description = book.description.value
      ? addTrailingDots(book.description.value, 500)
      : addTrailingDots(book.description, 500);
  }

  const handleClickAuthor = () => {
    navigate(`/search?q=${author.name}`);
  };
  return (
    <>
      <div className="book">
        <img
          src={
            book && book.covers && book.covers[0]
              ? `http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
              : "https://via.placeholder.com/300x500"
          }
          alt={book.title}
        />
        <div className="description">
          <div className="title">
            {book.title} {year}
          </div>
          <div className="author" onClick={handleClickAuthor}>
            {author.name}
          </div>
          <div className="description-text">{description}</div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
