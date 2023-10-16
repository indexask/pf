import React from "react"
import { Route, Routes } from "react-router-dom"
import { MyContextProvider } from "../context/MyContext" // Importa MyContextProvider
import ProductList from "../pages/ProductList"
import Cart from "../pages/Cart"
import DetailProduct from "../pages/DetailProduct"
import CatsProductList from "../pages/CatsProductList"
import DogsProductList from "../pages/DogProductList"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile"
import ModifyProfile from "../pages/ModifyProfile"
import Favorites from "../pages/Favorites"
import CreateProductPost from "../pages/CreateProductPost"
import MyPosts from "../pages/MyPost"

const AppRouter = () => {
  return (
    <>
      <MyContextProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:id" element={<DetailProduct />} />
          <Route
            path="/products/category/gatos"
            element={<CatsProductList />}
          />
          <Route
            path="/products/category/Perro"
            element={<DogsProductList />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mi-perfil" element={<Profile />} />
          <Route path="/modificar-perfil" element={<ModifyProfile />} />
          <Route path="/mis-favoritos" element={<Favorites />} />
          <Route path="/crear-publicación" element={<CreateProductPost />} />
          <Route path="/mis-publicaciones" element={<MyPosts />} />
        </Routes>
      </MyContextProvider>
    </>
  )
}

export default AppRouter
