import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../context/MyContext"
import axios from "axios"

const CatsProductList = () => {
  const [catsProducts, setCatsProducts] = useState([])
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
  } = useContext(MyContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/category/gatos")
      .then((response) => {
        setCatsProducts(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id)

    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
      setAllProducts(updatedProducts)
    } else {
      product.qty = 1
      setAllProducts([...allProducts, product])
    }

    setCountProducts(countProducts + 1)
    setTotal(total + product.price)
  }

  const handleClick = (product) => {
    navigate(`/${product.id}`)
  }

  const chile = new Intl.NumberFormat("es-CL")

  return (
    <div className="product-list-container">
      <div className="product-list">
        {catsProducts.map((product) => (
          <div className="product-card" id={product.id} key={product.id}>
            <div className="img-container" onClick={() => handleClick(product)}>
              <img src={product.img} alt={product.name} />
            </div>
            <h2 onClick={() => handleClick(product)}>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
            <p>{product.description}</p>
            <button onClick={() => onAddProduct(product)}>
              Agregar al Carrito - ${chile.format(product.price)}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatsProductList
