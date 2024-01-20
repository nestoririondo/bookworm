import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import Header from "../components/Header/Header";
import Results from "../components/Search/Results";
import Footer from "../components/Footer/Footer";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [clearBooks, setClearBooks] = useState(false);

  return (
    <>
      <Header
        prevQuery={query}
        clearBooks={clearBooks}
        setClearBooks={setClearBooks}
      />
      <Results
        query={query}
        clearBooks={clearBooks}
        setClearBooks={setClearBooks}
      />
      <Footer />
    </>
  );
};

export default Search;
