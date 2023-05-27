// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Main from "./components/main";

import Signup from "./components/main/Signup";
import Login from "./components/main/Login";
import Admin from "./components/admin";
import AddEquipment from "./components/admin/AddEquipment";
import ManageEquipment from "./components/admin/ManageEquipment";
import User from "./components/user";
import ListEquipment from "./components/main/ListEquipments";
import { ProductProvider } from "./context/ProductContext";
import Detail from "./components/main/EquipmentDetails";
import ShoppingCart from "./components/user/ShoppingCart";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <UserProvider>
          <Routes>
            <Route element={<Navigate to="/main/home" />} path="/" />
            <Route path="main" element={<Main />}>
              <Route element={<Home />} path="home" />
              <Route element={<Login />} path="login" />
              <Route element={<Signup />} path="signup" />
              <Route element={<Detail />} path="details/:id" />
              <Route element={<ListEquipment />} path="browse" />
            </Route>
            <Route path="user" element={<User />}>
              <Route element={<ShoppingCart />} path="cart" />
            </Route>
            <Route path="admin" element={<Admin />}>
              <Route element={<AddEquipment />} path="addequipment" />
              <Route element={<ManageEquipment />} path="manageequipment" />
            </Route>
          </Routes>
        </UserProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
