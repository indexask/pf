import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { MyContext } from "../context/MyContext"
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material"

const Login = () => {
  const { setUser } = useContext(MyContext)
  const navigate = useNavigate()
  const [user, setUserLocal] = useState({})
  const { login } = useContext(MyContext)

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {}
    field[name] = value
    setUserLocal({ ...user, ...field })
  }
  const log_in = async () => {
    const urlServer = "http://localhost:3000"
    const endpoint = "/login"
    const { email, password } = user
    try {
      if (!email || !password) {
        return alert("Email y contraseña son obligatorios")
      }

      const response = await axios.post(urlServer + endpoint, user)
      if (response.data) {
        const { email, token } = response.data
        console.log(response.data)
        console.log("Usuario identificado con éxito")

        alert("Usuario identificado con éxito")
        localStorage.setItem("token", token)
        setUser({ token })
        navigate("/mi-perfil")
        login({ email })
      } else {
        alert("La respuesta del servidor no contiene el token")
      }
    } catch (error) {
      if (error.response) {
        console.log("Error de respuesta:", error.response.data)
        alert(error.response.data + " 🙁")
      } else {
        console.log("Error general:", error)
        alert("Ocurrió un error al iniciar sesión 🙁")
      }
    }
  }

  return (
    <Container sx={{ p: "2rem" }}>
      <Paper elevation={15} sx={{ width: "70%", margin: "0 auto" }}>
        <Box sx={{ flexGrow: 1, display: "grid", gap: 4, p: 3 }}>
          <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
            Iniciar Sesión
          </Typography>
          <TextField
            label="Correo Electrónico"
            type="email"
            name="email"
            onChange={handleSetUsuario}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            onChange={handleSetUsuario}
            fullWidth
          />
          <Button onClick={log_in} variant="contained" fullWidth>
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
