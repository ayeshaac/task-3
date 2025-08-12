import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterPanel({ open, onClose, onApply, initialFilters }) {
  const [categories, setCategories] = useState(initialFilters.categories || {});
  const [sources, setSources] = useState(initialFilters.sources || {});
  const [fromDate, setFromDate] = useState(initialFilters.fromDate || "");
  const [toDate, setToDate] = useState(initialFilters.toDate || "");

  const handleCategoryChange = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.checked });
  };

  const handleSourceChange = (e) => {
    setSources({ ...sources, [e.target.name]: e.target.checked });
  };

  const handleApply = () => {
    onApply({ categories, sources, fromDate, toDate });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: 650,
          maxWidth: "90%",
          p: 3,
        },
      }}
    >
      <DialogTitle>Filter News</DialogTitle>
      <DialogContent>
        {/* Categories Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              {["Technology", "Sports", "Health"].map((cat) => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox
                      checked={!!categories[cat]}
                      onChange={handleCategoryChange}
                      name={cat}
                    />
                  }
                  label={cat}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Sources Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Sources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              {["News API", "BBC", "AlJazeera"].map((source) => (
                <FormControlLabel
                  key={source}
                  control={
                    <Checkbox
                      checked={!!sources[source]}
                      onChange={handleSourceChange}
                      name={source}
                    />
                  }
                  label={source}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Dates */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleApply}>
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}
 