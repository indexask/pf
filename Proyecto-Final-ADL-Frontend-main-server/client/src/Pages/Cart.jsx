import React, { useContext, useEffect, useState } from "react"
import { MyContext } from "../context/MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const Cart = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const { allProducts, updateCart, countProducts, total, user } =
    useContext(MyContext)

  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    if (user && user.id) {
      const userId = user.id
      axios.get(`/cart/${userId}`).then((response) => {
        setCartProducts(response.data)
      })
    } else {
      setCartProducts(allProducts)
    }
  }, [user, allProducts])

  const updateProductQuantity = (product, increment) => {
    const updatedProducts = cartProducts.map((item) => {
      if (item.id === product.id) {
        const newQty = Math.max(item.qty + increment, 0)
        return { ...item, qty: newQty }
      }
      return item
    })

    updateCart(updatedProducts)
  }

  const onDeleteProduct = (product) => {
    const updatedProducts = cartProducts.filter(
      (item) => item.id !== product.id
    )

    updateCart(updatedProducts)
  }

  const onDeleteCart = () => {
    updateCart([])
  }

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-l">
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <div className="cart-card" key={product.id}>
                <div className="card-l">
                  <div className="img-cart">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="title-total">
                    <h2>{product.name}</h2>
                    <p>${chile.format(product.price)}</p>
                  </div>
                </div>
                <div className="card-r">
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="fa-minus"
                    onClick={() => updateProductQuantity(product, -1)}
                  />
                  <p className="each-qty">{product.qty}</p>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fa-plus"
                    onClick={() => updateProductQuantity(product, 1)}
                  />
                  <p className="subtotal">
                    ${chile.format(product.price * product.qty)}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => onDeleteProduct(product)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <p>El carrito está vacío.</p>
            </div>
          )}
          {cartProducts.length > 0 && (
            <button className="delete-cart" onClick={() => onDeleteCart()}>
              Vaciar Carrito
            </button>
          )}
        </div>
        <div className="cart-r">
          {cartProducts.length > 0 && (
            <>
              <h2>Resumen</h2>
              <div className="cant">
                <p>Cantidad:</p>
                <p className="cant-p">{countProducts} productos</p>
              </div>
              <div className="total">
                <p>Total:</p>
                <p className="total-p">${chile.format(total)}</p>
              </div>
              <button className="pay">Pagar</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
