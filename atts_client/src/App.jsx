import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductList />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="*" element = {<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
