import { useNavigate } from "react-router-dom";
import { addTrailingDots } from "../../utils/string";
import { OPENLIBRARY_COVERS_BASE_URL } from "../../constants/openlibrary";
import "./BookCard.css";
import StarRating from "../StarRating";

const BookCard = ({ book, setFavorites, favorites }) => {
  const navigate = useNavigate();

  let {
    title,
    author_name,
    cover_edition_key,
    first_publish_year,
    ratings_average,
    key,
  } = book;

  const shortTitle = addTrailingDots(title, 40);
  const authorName = author_name ? author_name[0] : "Unknown";
  const bookKey = key.slice(7, key.length);

  const image = `${OPENLIBRARY_COVERS_BASE_URL}/${cover_edition_key}-M.jpg`;

  const addToFavorite = (event) => {
    event.stopPropagation();
    setFavorites((prev) => {
      if (!prev.includes(bookKey)) {
        return [...prev, bookKey];
      } else {
        const newArray = prev.filter((item) => item !== bookKey);
        return newArray;
      }
    });
    const myBooks = document.querySelector(".header__mybooks");
    myBooks.classList.add("add-animation");
    setTimeout(() => {
      myBooks.classList.remove("add-animation");
    }, 200);
  };

  return (
    <div className="book-btn">
      <div
        className={!favorites.includes(bookKey) ? "card" : "card favorite"}
        onClick={() => navigate(`${book.key}`)}
      >
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
            className={
              !favorites.includes(bookKey) ? "add add-btn" : "remove add-btn"
            }
            onClick={(event) => {
              addToFavorite(event);
            }}
          >
            {!favorites.includes(bookKey)
              ? "Add to My Books"
              : "Remove from My Books"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
