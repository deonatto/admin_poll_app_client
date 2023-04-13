import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "scenes/users/Users";
import Login from "scenes/login/Login";
import Profile from "scenes/profile/Profile";
import Layout from "scenes/layout/Layout";
import CreateEditUser from "scenes/createEditUser/CreateEditUser";

function App() {
  const isAuth = useSelector((state) => state.auth.token);
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path="/users"
              element={!!isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:id"
              element={!!isAuth ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/user/:id"
              element={!!isAuth ? <CreateEditUser /> : <Navigate to="/" />}
            />
            <Route
              path="/user/"
              element={!!isAuth ? <CreateEditUser /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
