const Pagination = ({ skip, setSkip, limit }) => {
  return (
    <div>
      <button
        className="btn-pageable"
        onClick={() => {
          if (skip > 0) {
            setSkip(skip - limit);
          }
        }}
      >
        Previous
      </button>
      <button
        className="btn-pageable"
        onClick={() => {
          setSkip(skip + limit);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
