import React from "react";

const Filtering = ({ filter, handleFilterChange }) => {
  return (
    <>
      <form>
        <div>
          filter shown with{" "}
          <input type="text" value={filter} onChange={handleFilterChange} />
        </div>
      </form>
    </>
  );
};

export default Filtering;
