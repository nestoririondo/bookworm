import { useSearchParams } from "react-router-dom";
import Search from "../components/Search/Search";
import Footer from "../components/Footer/Footer";

const Books = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <>
     <Search query={query} />
     <Footer />
    </>
  );
};

export default Books;
