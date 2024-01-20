import { useNavigate } from "react-router-dom";
import { addTrailingDots } from "../../utils/string";
import { OPENLIBRARY_COVERS_BASE_URL } from "../../constants/openlibrary";
import "./BookCard.css";
import StarRating from "../StarRating";

const BookCard = ({ book, setFavorites }) => {
  const navigate = useNavigate();

  let {
    title,
    author_name,
    cover_edition_key,
    first_publish_year,
    ratings_average,
  } = book;

  const shortTitle = addTrailingDots(title, 40);
  const authorName = author_name ? author_name[0] : "Unknown";

  const image = `${OPENLIBRARY_COVERS_BASE_URL}/${cover_edition_key}-M.jpg`;

  const addToFavorite = (event, id) => {
    event.stopPropagation();
    setFavorites((prev) => {
      const bookId = id.slice(7, id.length);
      if (!prev.includes(bookId)) {
        return [...prev, bookId];
      } else {
        return prev;
      }
    });
  };

  return (
    <div className="book-btn">
      <div className="card" onClick={() => navigate(`${book.key}`)}>
        <img
          src={image ? image : `https://via.placeholder.com/300}`}
          alt={title}
        />
        <div className="card-title">
          <div className="author">{authorName}</div>
          <div className="title">{shortTitle}</div>
          <div className="year">{first_publish_year}</div>
          <div className="rating">
            <StarRating rating={ratings_average} />
          </div>
          <div className="description"></div>
          <button
            className="add-btn"
            onClick={(event) => {
              addToFavorite(event, book.key);
            }}
          >
            Add to favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
