import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [preferences, setPreferences] = useState({
    categories: {},
    authors: {},
  });

  const [filters, setFilters] = useState({
    categories: {},
    sources: {},
    fromDate: "",
    toDate: ""
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log("Applied Filters:", newFilters);
  };

  const handleSavePreferences = (newPrefs) => {
    setPreferences(newPrefs);
    console.log("Saved Preferences:", newPrefs);
  };

  return (
    <div>
      <Navbar preferences={preferences} onSavePreferences={handleSavePreferences} />
      <SearchBar
        onSearch={handleSearch}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
      <NewsList
        searchTerm={searchTerm}
        preferences={preferences}
        filters={filters}
      />
    </div>
  );
}
