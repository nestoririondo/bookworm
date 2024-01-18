import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { OPENLIBRARY_BASE_URL } from "../constants/openlibrary";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";
import BookDetail from "../components/BookDetail/BookDetail";
import BackButton from "../components/BackButton/BackButton";

const fetchBook = async (key, setBook, setAuthor, setLoading) => {
  try {
    const response = await axios.get(
      `${OPENLIBRARY_BASE_URL}/works/${key}.json`
    );
    setBook(response.data);
    console.log("Book:", response.data);
    const authorKey = response.data.authors[0].author.key;
    try {
      const response = await axios.get(
        `${OPENLIBRARY_BASE_URL}${authorKey}.json`
      );
      setAuthor(response.data);
      console.log("Author:", response.data);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const Book = () => {
  const { key } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook(key, setBook, setAuthor, setLoading);
  }, []);

  return (
    <>
      <SearchBar />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !loading && !book && !author ? (
        <div className="no-data">No data</div>
      ) : (
        <BookDetail book={book} author={author} />
      )}
      <BackButton goBack={() => navigate(-1)} />
    </>
  );
};

export default Book;
