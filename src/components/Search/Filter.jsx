const Filter = ({ setSort, setBooks }) => {
  const handleSort = (e) => {
    setBooks([]);
    setSort(e.target.value);
  };
  return (
    <div className="filter">
      <label htmlFor="sort">Sort by:</label>
      <select onChange={(e) => handleSort(e)} name="sort" id="sort">
        <option value="rating">Rating</option>
        <option value="old">Oldest</option>
        <option value="new">Newest</option>
      </select>
    </div>
  );
};

export default Filter;
