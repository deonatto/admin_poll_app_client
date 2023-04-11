import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user/?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}&sortField=${sort.field}&sort=${sort.sortType}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(res);
        //setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, [paginationModel, sort, search, token]);
  //table headers
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 1,
      sortable: false,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
  ];
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
      <div style={{ marginTop: "40px", height: "80vh" }}>
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pageSizeOptions={[20, 50, 100]}
          pagination
          paginationModel={paginationModel}
          paginationMode="server"
          sortingMode="server"
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel) => sortHandler(newSortModel)}
        />
      </div>
    </div>
  );
};

export default Home;
