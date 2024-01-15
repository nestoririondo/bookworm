import Book from "./views/Book";
import Books from "./views/Books";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/search?q=the" />} />
        <Route path="/search" element={<Books />} />
        <Route path="/works/:key" element={<Book />} />
      </Routes>
    </>
  );
};

export default App;
