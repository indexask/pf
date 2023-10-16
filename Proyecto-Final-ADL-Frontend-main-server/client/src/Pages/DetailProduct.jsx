import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { MyContext } from "../context/MyContext"

const DetailProduct = () => {
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
    data,
  } = useContext(MyContext)

  const { id } = useParams()
  const product = data.find((product) => product.id === parseInt(id))

  if (!product) {
    return <div>Producto no encontrado.</div>
  }

  const chile = new Intl.NumberFormat("es-CL")
  const productName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1)

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id)

    if (existingProduct) {
      const updatedProduct = { ...existingProduct }
      updatedProduct.qty += 1

      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? updatedProduct : item
      )

      setAllProducts(updatedProducts)
    } else {
      const newProduct = { ...product, qty: 1 }
      setAllProducts([...allProducts, newProduct])
    }

    setCountProducts(countProducts + 1)
    setTotal(total + product.price)
  }

  return (
    <div className="detail-container">
      <div className="detail">
        <div className="detail-l">
          <h2>{productName}</h2>
          <p>
            <span>Descripción: </span>
            {product.description}
          </p>
          <p>{product.desc}</p>
          <div className="buy">
            <h3>Precio: ${chile.format(product.price)}</h3>
          </div>
          <div className="buy">
            <button
              onClick={() => onAddProduct(product)}
              className="add-detail"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
        <div className="detail-r">
          <div className="detail-img">
            <img src={product.img} alt={productName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
