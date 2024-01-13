import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const { title, authors } = book.volumeInfo;

  const image = book.volumeInfo?.imageLinks
    ? book.volumeInfo.imageLinks.small ?? book.volumeInfo.imageLinks.thumbnail
    : "https://via.placeholder.com/150";
    
  return (
    <>
      <div className="card" onClick={() => navigate(`/book/${book.id}`)}>
        <img src={image} alt={title} />
        <div>{title}</div>
        <div>{authors}</div>
      </div>
    </>
  );
};

export default BookCard;
