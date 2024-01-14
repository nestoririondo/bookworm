import SearchResults from "./views/SearchResults";
import Book from "./views/Book";
import Home from "./views/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search/:search" element={<SearchResults />} />
        <Route path="/works/:key" element={<Book />} />
      </Routes>
    </>
  );
};

export default App;
