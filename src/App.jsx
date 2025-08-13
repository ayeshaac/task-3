import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";

export default function App() {
  const [preferences, setPreferences] = useState({
    categories: {},
    authors: {}
  });

  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    source: ""
  });

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar
        preferences={preferences}
        onSavePreferences={setPreferences}
      />

      <SearchBar
        onSearch={setSearchTerm}
        onApplyFilters={setFilters}
        initialFilters={filters}
      />

      <NewsList
        preferences={preferences}
        filters={filters}
        searchTerm={searchTerm}
      />
    </>
  );
}
