import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"
import { MyContext } from "../context/MyContext"

function ModifyProfile() {
  const { user, updateUser, logout } = useContext(MyContext)
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    newPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios.put(
        "http://localhost:3000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )

      if (response.status === 200) {
        const updatedUser = { ...user, ...formData }
        updateUser(updatedUser)
        console.log("Perfil actualizado con éxito.")
      } else {
        console.error("Error al actualizar el perfil.")
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h1 className="profile-title">
          <Link to="/profile" className="profile-link">
            Mi Perfil
          </Link>
        </h1>
        <ul className="profile-links">
          <li>
            <Link to="/mi-perfil" className="profile-link">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link to="/modificar-perfil" className="profile-link active">
              Modificar Perfil
            </Link>
          </li>
          <li>
            <Link to="/mis-favoritos" className="profile-link">
              Mis Favoritos
            </Link>
          </li>
          <li>
            <Link to="/crear-publicación" className="profile-link">
              Crear Publicación
            </Link>
          </li>
          <li>
            <Link to="/mis-publicaciones" className="profile-link">
              Mis Publicaciones
            </Link>
          </li>
        </ul>
        <button onClick={logout} className="dark-button">
          Cerrar Sesión
        </button>
      </div>

      <div className="profile-content">
        <h1 className="profile-content-title">Modificar Perfil</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="dark-button">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModifyProfile
