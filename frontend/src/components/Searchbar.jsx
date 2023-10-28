import React, { useState } from "react";

export const Searchbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
      <button onClick={() => {handleSearch(searchQuery)}}>Search</button>
    </div>
  );
};
