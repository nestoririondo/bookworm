import { BookContext } from "../provider/BookProvider";
import { useContext, useState, useEffect } from "react";
import { OPENLIBRARY_BASE_URL } from "../constants/openlibrary";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";


const MyBooks = () => {
  const { myBooks, setMyBooks } = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header />
      {myBooks && (
        <div className="body">
          <div className="results">
            {myBooks.map((book, index) => (
              <div key={index}>{book.bookid}</div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyBooks;
