import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
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
        sx={{ width: "50%" }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}
