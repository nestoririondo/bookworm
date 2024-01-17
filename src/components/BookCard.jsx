import { useNavigate } from "react-router-dom";
import { addTrailingDots } from "../utils/string";
import { OPENLIBRARY_COVERS_BASE_URL } from "../constants/openlibrary";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  let { title, author_name, cover_edition_key } = book;
  
  const shortTitle = addTrailingDots(title, 40);
  const authorName = author_name ? author_name[0] : "Unknown";
  
  const image = `${OPENLIBRARY_COVERS_BASE_URL}/${cover_edition_key}-M.jpg`;

  return (
    <>
      <div className="card" onClick={() => navigate(`${book.key}`)}>
        <img
          src={image ? image : `https://via.placeholder.com/300}`}
          alt={title}
        />
        <div className="card-title">
          <h4>{shortTitle}</h4>
          <div>{authorName}</div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
