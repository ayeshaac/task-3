import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterPanel from "./FilterPanel";

export default function SearchBar({ onSearch, onApplyFilters, initialFilters }) {
  const [searchText, setSearchText] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters || {});

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    onApplyFilters(newFilters);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
      <TextField
        label="Search News"
        variant="outlined"
        size="small"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setFilterOpen(true)}>
                <FilterListIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {/* Filter Panel Dialog */}
      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
    </Box>
  );
}
