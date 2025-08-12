import React, { useState } from "react";
import { Box, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterPanel from "./filterPanel.jsx";

export default function SearchBar({ onSearch, onApplyFilters, initialFilters }) {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false); // Dialog open state

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleFilterClick = () => {
    setFilterOpen(true); // open dialog
  };

  const handleCloseFilterPanel = () => {
    setFilterOpen(false); // close dialog
  };

  const handleApplyFilters = (filters) => {
    onApplyFilters(filters); // pass filters to App.js
    handleCloseFilterPanel();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 3,
        mb: 3
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ width: "50%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleFilterClick}>
                <FilterListIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {/* Filter Dialog */}
      <FilterPanel
        open={filterOpen}
        onClose={handleCloseFilterPanel}
        onApply={handleApplyFilters}
        initialFilters={initialFilters}
      />
    </Box>
  );
}
