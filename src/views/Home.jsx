import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header/Header";
import Results from "../components/Search/Results";
import Footer from "../components/Footer/Footer";

const fetchWord = async (setWord, setLoading) => {
  try {
    const response = await fetch(
      `https://random-word-api.vercel.app/api?words=1`
    );
    const data = await response.json();
    setWord(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const Search = () => {
  const [clearBooks, setClearBooks] = useState(false);
  const [word, setWord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWord(setWord, setLoading);
  }, []);

  return (
    <>
      <Header
        prevQuery={word}
        clearBooks={clearBooks}
        setClearBooks={setClearBooks}
      />
      <div className="body">
        {!loading && word && (
          <Results
            query={word}
            clearBooks={clearBooks}
            setClearBooks={setClearBooks}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;
