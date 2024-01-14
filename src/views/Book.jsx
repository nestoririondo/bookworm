import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

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
        console.log(secondResponse.data);
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

  let year =
    book && book.first_publish_date
      ? `(${book.first_publish_date.slice(-4)})`
      : "";

  let description = "No description available";

  if (book && book.description) {
    description = book.description.value
      ? `${book.description.value.slice(0, 500)}...`
      : `${book.description.slice(0, 500)}...`;
  }

  return (
    <>
      <SearchBar />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !loading && !book && !author ? (
        <div className="no-data">No data</div>
      ) : (
        <>
          <div className="book">
            <img
              src={`http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={book.title}
            />
            <div className="description">
              <div className="title">
                {book.title} {year}
              </div>
              <div className="author">{author.name}</div>
              <div className="description-text">{description}</div>
            </div>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </>
  );
};

export default Book;
