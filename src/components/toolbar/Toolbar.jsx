import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import "./Toolbar.css";
const Toolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <div className="toolbar-container" style={{ width: "100%" }}>
        <div className="toolbar-container">
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
        <TextField
          label="Search by email..."
          sx={{ width: "17rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </GridToolbarContainer>
  );
};

export default Toolbar;
