import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toolbar from "components/toolbar/Toolbar";
import { colorTokens } from "theme";
import Message from "components/message/Message";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "components/header/Header";

const PollOptions = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });
  const [sort, setSort] = useState({
    field: "",
    sortType: "",
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const headers = useMemo(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  // Fetch all polls
  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/pollOption/?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&sortField=${sort.field}&sort=${sort.sortType}&search=${search}`,
          {
            headers,
          }
        );
        setData(res.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, [paginationModel, sort, search, token, headers]);
  // Defining table columns
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
    },
    {
      field: "pollName",
      headerName: "Poll Name",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      sortable: false,
      minWidth: 100,
      renderCell: (params) => {
        const editHandler = () => {
          navigate(`/option/${params.id}`);
        };

        const deleteHandler = async () => {
          setIsLoading(true);
          try {
            await axios.delete(
              `${process.env.REACT_APP_BASE_URL}/pollOption/${params.id}`,
              {
                headers,
              }
            );
            // Filter out the deleted user from the current data state
            const updatedData = data.pollOptions.filter(
              (user) => user._id !== params.id
            );
            setData((prevState) => ({
              ...prevState,
              pollOptions: updatedData,
              total: prevState.total - 1,
            }));
          } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
          } finally {
            setIsLoading(false);
          }
        };

        return (
          <div>
            <IconButton onClick={editHandler} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteHandler} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  // Handler function for sorting
  const sortHandler = (sortModel) => {
    if (sortModel.length > 0) {
      setSort((prevState) => ({
        ...prevState,
        field: sortModel[0].field,
        sortType: sortModel[0].sort,
      }));
    } else {
      setSort((prevState) => ({
        ...prevState,
        field: "",
        sortType: "",
      }));
    }
  };
  return (
    <div style={{ padding: "1rem 1rem" }}>
      <Header title="Poll Options" subTitle="Management of all Poll Options" />
      {error ? (
        <Message color="red" message={error} />
      ) : (
        <div style={{ marginTop: "40px", height: "80vh" }}>
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            rows={(data && data.pollOptions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            pageSizeOptions={[20, 50, 100]}
            pagination
            paginationModel={paginationModel}
            paginationMode="server"
            sortingMode="server"
            onPaginationModelChange={setPaginationModel}
            onSortModelChange={(newSortModel) => sortHandler(newSortModel)}
            sx={{
              background: colorTokens.primary[50],
            }}
            components={{ Toolbar }}
            componentsProps={{
              toolbar: {
                searchInput,
                setSearchInput,
                setSearch,
                tableType: "option",
                searchLabel: "name",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PollOptions;
