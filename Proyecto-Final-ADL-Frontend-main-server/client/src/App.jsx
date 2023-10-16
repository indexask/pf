import React, { useEffect, useState } from "react"
import { MyContextProvider } from "./context/MyContext"
import Header from "./components/Header"
import AppRouter from "./router/AppRouter"
import Footer from "./components/Footer"

function App() {
  const [productData, setProductData] = useState([])
  const [userData, setUserData] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [countProducts, setCountProducts] = useState(0)
  const [user, setUser] = useState(null)

  return (
    <MyContextProvider
      value={{
        user,
        setUser,
        userData,
        allProducts,
        setAllProducts,
        total,
        setTotal,
        countProducts,
        setCountProducts,
      }}
    >
      <Header />
      <AppRouter />
      <Footer />
    </MyContextProvider>
  )
}

export default App
