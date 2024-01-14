import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Book = () => {
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  let { key } = useParams();

  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/works/${key}.json`
      );
      setBook(response.data);
      console.log(response.data);
      const authorKey = response.data.authors[0].author.key;
      try {
        const secondResponse = await axios.get(
          `https://openlibrary.org${authorKey}.json`
        );
        setAuthor(secondResponse.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      setBook(null);
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
      ) : !loading && !book && !author ? (
        <div className="no-data">No data</div>
      ) : (
        <>
          <div>{book.title}</div>
          <div>{author.personal_name}</div>
          <img
            src={`http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
            alt={book.title}
          />
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </>
  );
};

export default Book;
