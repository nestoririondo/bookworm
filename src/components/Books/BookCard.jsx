import { useNavigate } from "react-router-dom";
import { OPENLIBRARY_COVERS_BASE_URL } from "../../constants/openlibrary";
import { addTrailingDots } from "../../utils/string";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  let { title: _title, author_name: _authorName, cover_edition_key } = book;

  const title = addTrailingDots(_title, 40);
  const authorName = _authorName ? _authorName[0] : "Unknown";
  const image = `${OPENLIBRARY_COVERS_BASE_URL}/${cover_edition_key}-M.jpg`;

  return (
    <>
      <div className="card" onClick={() => navigate(`${book.key}`)}>
        <img
          src={image ? image : `https://via.placeholder.com/300}`}
          alt={_title}
        />
        <div className="card-title">
          <h4>{title}</h4>
          <div>{authorName}</div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
