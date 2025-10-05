import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLayout from "./Components/Admin/AdminLayout";
import AddBook from "./Components/Admin/AddBook";
import AllBooks from "./Components/Admin/AllBooks";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const location = useLocation();
  const hideHeader = /^\/admin(\/|$)/.test(location.pathname);
  return (
    <div>
      {!hideHeader && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="add-book" element={<AddBook />} />
          <Route index path="books" element={<AllBooks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
