import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";

export default function App() {
  // Single combined state for preferences + filters
  const [preferences, setPreferences] = useState({
    categories: {},
    authors: {},
    sources: {},
    fromDate: "",
    toDate: ""
  });

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar preferences={preferences} onSavePreferences={setPreferences} />

      <SearchBar
        onSearch={setSearchTerm}
        filters={preferences}
        setFilters={setPreferences} // update combined state
      />

      <NewsList searchTerm={searchTerm} preferences={preferences} />
    </>
  );
}
