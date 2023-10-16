import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../context/MyContext"
import axios from "axios"

const ProductList = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const { allProducts, updateCart } = useContext(MyContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Manejo de errores en la solicitud de productos
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error)
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
      })
  }, [])

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id)

    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
      updateCart(updatedProducts)
    } else {
      product.qty = 1
      const updatedProducts = [...allProducts, product]
      updateCart(updatedProducts)
    }
  }

  const onDeleteProduct = (product) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === product.id
        ? { ...item, qty: Math.max(item.qty - 1, 0) }
        : item
    )

    // Marcar productos que están en el carrito
    const results = updatedProducts.map((item) =>
      item.qty > 0 ? { ...item, inCart: true } : { ...item, inCart: false }
    )

    updateCart(results)
  }

  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" id={product.id} key={product.id}>
            <div className="img-container" onClick={() => handleClick(product)}>
              <img src={product.img} alt={product.name} />
            </div>
            <h2 onClick={() => handleClick(product)}>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
            <p>{product.description}</p>
            <button onClick={() => onAddProduct(product)}>
              {product.inCart
                ? "Añadido"
                : `Agregar al Carrito - ${chile.format(product.price)}`}
            </button>
            {product.inCart && (
              <button onClick={() => onDeleteProduct(product)}>
                Eliminar del Carrito
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
