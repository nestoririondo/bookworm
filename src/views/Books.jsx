import { useSearchParams } from "react-router-dom";
import { BooksOverview } from "../components/Books/BooksOverview";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <>
      <BooksOverview query={query} />
    </>
  );
};

export default SearchResults;
