import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Button } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { colorTokens } from "theme";
import { useNavigate } from "react-router-dom";
import "./Toolbar.css";
const Toolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  tableType,
  searchLabel,
}) => {
  const navigate = useNavigate();
  return (
    <GridToolbarContainer>
      <div className="toolbar-container" style={{ width: "100%" }}>
        <div className="toolbar-container">
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
        <div className="toolbar-btn-search-container">
          <Button
            onClick={() => navigate(`/${tableType}/`)}
            fullWidth
            sx={{
              width: "100px",
              fontWeight: "bold",
              padding: "0.5rem",
              backgroundColor: colorTokens.primary[600],
              color: colorTokens.grey[0],
              "&:hover": {
                backgroundColor: colorTokens.primary[500],
                color: colorTokens.grey[0],
              },
            }}
          >
            {`Add ${tableType}`}
          </Button>
          <TextField
            label={`Search by ${searchLabel}...`}
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
      </div>
    </GridToolbarContainer>
  );
};

export default Toolbar;
