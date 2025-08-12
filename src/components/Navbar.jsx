import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PreferencesDialog from "./PreferencesDialog";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News Aggregator
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>
            Preferences
          </Button>
        </Toolbar>
      </AppBar>

      <PreferencesDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
