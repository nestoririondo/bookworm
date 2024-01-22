import Home from "./views/Home";
import Book from "./views/Book";
import Search from "./views/Search";
import MyBooks from "./views/MyBooks";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mybooks" element={<MyBooks />}/>
        <Route path="/works/:key" element={<Book />} />
      </Routes>
    </>
  );
};

export default App;
