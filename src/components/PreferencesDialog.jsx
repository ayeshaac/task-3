import React from "react";
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

export default function PreferencesDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Preferences</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Categories
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Technology" />
          <FormControlLabel control={<Checkbox />} label="Sports" />
          <FormControlLabel control={<Checkbox />} label="Health" />
        </FormGroup>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Preferred Authors
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Author A" />
          <FormControlLabel control={<Checkbox />} label="Author B" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
