import "./Header.css";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Header = ({ prevQuery, clearBooks, setClearBooks }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__inside">
        <h1 className="header__title" onClick={() => navigate("/")}>
          BookWorm
        </h1>
        <div>My Books</div>
        <SearchBar
          prevQuery={prevQuery}
          clearBooks={clearBooks}
          setClearBooks={setClearBooks}
        />
      </div>
    </header>
  );
};

export default Header;
