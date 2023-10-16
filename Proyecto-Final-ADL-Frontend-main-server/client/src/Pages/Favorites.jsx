import React, { useState, useEffect, useContext } from "react"
import { MyContext } from "../context/MyContext"
import { Link, Navigate } from "react-router-dom"
import Axios from "axios" // Importa Axios

function Favorites() {
  const { user, logout } = useContext(MyContext)
  const [favorites, setFavorites] = useState([])
  const [newFavorite, setNewFavorite] = useState("")

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Realiza una solicitud GET al servidor para obtener la lista de favoritos
        const response = await Axios.get(
          "http://localhost:3000/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Asegúrate de incluir el token de autenticación
            },
          }
        )

        if (response.status === 200) {
          setFavorites(response.data.favorites) // Actualiza la lista de favoritos con la respuesta del servidor
        } else {
          console.error("Error al obtener la lista de favoritos.")
        }
      } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error)
      }
    }

    if (user) {
      fetchFavorites() // Llama a la función para obtener los favoritos solo si el usuario está autenticado
    }
  }, [user])

  const addFavorite = () => {
    if (newFavorite.trim() !== "") {
      setFavorites([...favorites, newFavorite])
      setNewFavorite("")
    }
  }

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites]
    updatedFavorites.splice(index, 1)
    setFavorites(updatedFavorites)
  }

  if (!user) {
    return <Navigate to="/login" />
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
            <Link to="/modificar-perfil" className="profile-link">
              Modificar Perfil
            </Link>
          </li>
          <li>
            <Link to="/mis-favoritos" className="profile-link active">
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
        <h1 className="profile-content-title">Favoritos</h1>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>{favorite}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Favorites
