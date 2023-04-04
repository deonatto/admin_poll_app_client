import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "scenes/home/Home";
import Login from "scenes/login/Login";
import Profile from "scenes/profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Login} />
          <Route path="/home" element={Home} />
          <Route path="/profile/:id" element={Profile} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
