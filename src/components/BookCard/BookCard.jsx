import { useNavigate } from "react-router-dom";
import { addTrailingDots } from "../../utils/string";
import { OPENLIBRARY_COVERS_BASE_URL } from "../../constants/openlibrary";
import { SERVER_BASE_URL } from "../../constants/server";
import { useContext } from "react";
import { BookContext } from "../../provider/BookProvider";
import "./BookCard.css";
import StarRating from "../StarRating";
import axios from "axios";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { myBooks, setMyBooks } = useContext(BookContext);

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
  const bookid = key.slice(7, key.length);

  const image = `${OPENLIBRARY_COVERS_BASE_URL}/${cover_edition_key}-M.jpg`;

  const user_id = 1;

  const addToMyBooks = async (event) => {
    event.stopPropagation();
    console.log(myBooks);
    console.log(bookid);
    console.log(Boolean(myBooks.find((book) => book.bookid === bookid)));
    if (!myBooks.find((book) => book.bookid === bookid)) {
      try {
        const response = await axios.post(
          `${SERVER_BASE_URL}/myBooks/add/${bookid}`,
          { user_id }
        );
        console.log("Post Success:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await axios.delete(
          `${SERVER_BASE_URL}/myBooks/delete/${bookid}`,
          { data: { user_id } }
        );
        console.log("Delete Success:", response.data);
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
    // Fetch the latest data from the server
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/myBooks`, {
        params: { user_id },
      });
      setMyBooks(response.data);
      console.log("Fetch Success:", response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
    // Add animation to My Books header
    const myBooksHeader = document.querySelector(".header__mybooks");
    myBooksHeader.classList.add("add-animation");
    setTimeout(() => {
      myBooksHeader.classList.remove("add-animation");
    }, 200);
  };

  return (
    <div className="book-btn">
      <div
        className={
          !myBooks.find((book) => book.bookid === bookid)
            ? "card"
            : "card favorite"
        }
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
              !myBooks.find((book) => book.bookid === bookid)
                ? "add add-btn"
                : "remove add-btn"
            }
            onClick={(event) => {
              addToMyBooks(event);
            }}
          >
            {!myBooks.find((book) => book.bookid === bookid)
              ? "Add to My Books"
              : "Remove from My Books"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
