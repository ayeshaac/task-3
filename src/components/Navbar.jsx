import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Chip, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PreferencesDialog from "./PreferencesDialog";

export default function Navbar({ preferences, onSavePreferences }) {
  const [open, setOpen] = useState(false);

  const handleSave = (newPrefs) => {
    onSavePreferences(newPrefs); // Send updated preferences to App.js
    setOpen(false);
  };

  // Selected filters
  const selectedCategories = Object.keys(preferences.categories || {}).filter(
    (key) => preferences.categories[key]
  );
  const selectedAuthors = Object.keys(preferences.authors || {}).filter(
    (key) => preferences.authors[key]
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News Aggregator
          </Typography>

          {/* Display active filters */}
          <Box sx={{ display: "flex", gap: 1, mr: 2, flexWrap: "wrap" }}>
            {selectedCategories.length > 0 || selectedAuthors.length > 0 ? (
              <>
                {selectedCategories.map((cat) => (
                  <Chip key={cat} label={cat} size="small" color="secondary" />
                ))}
                {selectedAuthors.map((auth) => (
                  <Chip key={auth} label={auth} size="small" color="primary" />
                ))}
              </>
            ) : (
              <Chip label="All News" size="small" variant="outlined" />
            )}
          </Box>

          {/* Preferences Button */}
          <Button
            color="inherit"
            onClick={() => setOpen(true)}
            sx={{ textTransform: "none" }}
          >
            Preferences
          </Button>
        </Toolbar>
      </AppBar>

      {/* Preferences Dialog */}
      <PreferencesDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialPreferences={preferences}
      />
    </>
  );
}
