import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import { useContext, useEffect } from "react"
import { MyContext } from "../context/MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCat,
  faDog,
  faHouse,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  const activeClass = ({ isActive }) => (isActive ? "active" : "")
  const { isAuthenticated, logout, countProducts, allProducts } =
    useContext(MyContext)

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {}, [isAuthenticated])

  return (
    <div className="header-container">
      <header>
        <div className="header-l">
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
        </div>
        <div className="header-c">
          <NavLink className={activeClass} to="/">
            <FontAwesomeIcon icon={faHouse} />
            Inicio
          </NavLink>
          <NavLink to="/products/category/gatos">
            <FontAwesomeIcon icon={faCat} />
            Gatos
          </NavLink>
          <NavLink to="/products/category/Perro">
            <FontAwesomeIcon icon={faDog} />
            Perros
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/mi-perfil">
                <FontAwesomeIcon icon={faUser} />
                Perfil
              </NavLink>
              <NavLink to="/" onClick={handleLogout}>
                <FontAwesomeIcon icon={faUser} />
                Cerrar Sesión
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <FontAwesomeIcon icon={faUser} />
                Ingresar
              </NavLink>
              <NavLink to="/register">
                <FontAwesomeIcon icon={faUserPlus} />
                Registrarse
              </NavLink>
            </>
          )}
        </div>
        <NavLink className={activeClass} to="/cart">
          <div className="header-r">
            <i className="fa-solid fa-cart-shopping"></i>
            <p
              className={`cart-num ${allProducts.length === 0 ? "hidden" : ""}`}
            >
              {countProducts}
            </p>
          </div>
        </NavLink>
      </header>
    </div>
  )
}

export default Header
