import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  let { title, author_name, cover_edition_key } = book;
  author_name = author_name ? author_name[0] : "Unknown";
  title = title.length > 40 ? title.slice(0, 40) + "..." : title;

  const image =
    `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`
      ? `https://covers.openlibrary.org/b/olid/${cover_edition_key}-M.jpg`
      : `https://covers.openlibrary.org/b/olid/${cover_edition_key}-S.jpg`
      ? `https://covers.openlibrary.org/b/olid/${cover_edition_key}-S.jpg`
      : null;

  return (
    <>
      <div className="card" onClick={() => navigate(`${book.key}`)}>
        <img
          src={image ? image : `https://via.placeholder.com/300}`}
          alt={title}
        />
        <div className="card-title">
          <h4>{title}</h4>
          <div>{author_name}</div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
