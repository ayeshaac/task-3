import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Search term:", term); // later this will trigger API calls
  };

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <NewsList searchTerm={searchTerm} />
    </div>
  );
}
