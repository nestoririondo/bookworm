
const SearchBar = ({ handleSubmit, searchInput, setSearchInput }) => {

  return (
    <form className='search-bar' onSubmit={(e) => handleSubmit(e, searchInput)}>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
