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


/**
 * A toolbar component with search functionality, export button, column button, density selector button, and an "Add" button to navigate to a new page to create a new item of the specified table type.
 * @param {string} searchInput - The current value of the search input field.
 * @param {function} setSearchInput - A function to update the value of the search input field.
 * @param {function} setSearch - A function to perform the search with the input value and update the table.
 * @param {string} tableType - The type of table being displayed.
 * @param {string} searchLabel - The label to use for the search input field.
 */

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
              width: "110px",
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
