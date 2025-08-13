import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

export default function PreferencesDialog({ open, onClose, onSave, initialPreferences }) {
  const [categories, setCategories] = useState(initialPreferences?.categories || {});
  const [authors, setAuthors] = useState(initialPreferences?.authors || {});

  // Sync state with initialPreferences when dialog opens or preferences change
  useEffect(() => {
    setCategories(initialPreferences?.categories || {});
    setAuthors(initialPreferences?.authors || {});
  }, [initialPreferences, open]);

  const handleCategoryChange = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };

  const handleAuthorChange = (event) => {
    setAuthors({ ...authors, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    onSave({ categories, authors });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Preferences</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Categories
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={!!categories.Technology} onChange={handleCategoryChange} name="Technology" />}
            label="Technology"
          />
          <FormControlLabel
            control={<Checkbox checked={!!categories.Sports} onChange={handleCategoryChange} name="Sports" />}
            label="Sports"
          />
          <FormControlLabel
            control={<Checkbox checked={!!categories.Health} onChange={handleCategoryChange} name="Health" />}
            label="Health"
          />
        </FormGroup>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Preferred Authors
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={!!authors["Author A"]} onChange={handleAuthorChange} name="Author A" />}
            label="Author A"
          />
          <FormControlLabel
            control={<Checkbox checked={!!authors["Author B"]} onChange={handleAuthorChange} name="Author B" />}
            label="Author B"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
