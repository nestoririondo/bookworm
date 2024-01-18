import "./LoadMoreButton.css";

const LoadMoreButton = ({ isShown, loadMore }) => {
  if (!isShown) return null;
  return (
    <button className="load-more-btn" onClick={loadMore}>
      Load more
    </button>
  );
};

export default LoadMoreButton;
