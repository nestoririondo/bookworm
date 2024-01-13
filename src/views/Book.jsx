import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Book = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    try {
      setBook(response.data);
    } catch (error) {
      console.log(error);
      setBook(null)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !loading && !book ? (
        <div className="no-data">No data</div>
      ) : (
        <>
          <div>{book.volumeInfo.title}</div>
          <div>{book.volumeInfo.authors}</div>
          <img
            src={book.volumeInfo.imageLinks.medium ? book.volumeInfo.imageLinks.medium : book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </>
  );
};

export default Book;
