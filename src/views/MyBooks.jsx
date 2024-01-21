import { useState, useEffect } from "react";
import axios from "axios";
import { OPENLIBRARY_BASE_URL } from "../constants/openlibrary";
import { OPENLIBRARY_COVERS_BASE_URL } from "../constants/openlibrary";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("localFavorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchBooks = async (setBooks, setIsLoading) => {
    setIsLoading(true);
    try {
      const promises = favorites.map((bookKey) =>
        axios.get(`${OPENLIBRARY_BASE_URL}/works/${bookKey}.json`)
      );
      const responses = await Promise.all(promises);
      const books = responses.map((response) => response.data);
      setBooks(books);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("localFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchBooks(setBooks, setIsLoading);
  }, []);

  return (
    <>
      <Header />
      {isLoading ? <div className="loading">Loading...</div> : null}
      {!isLoading && books && (
        <div className="body">
          <div className="results">
            {books.map((book) => (
              <div>{book.title}</div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyBooks;
