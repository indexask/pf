import React, { useState } from "react"
import { Container, Paper, Typography, TextField, Button } from "@mui/material"
import axios from "axios"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const registeredUsers = async (usuario) => {
    const urlServer = "http://localhost:3000"
    const endpoint = "/usuarios"
    try {
      await axios.post(urlServer + endpoint, usuario)
      alert("Usuario registrado con éxito")
    } catch (error) {
      alert("Algo salió mal ...")
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    registeredUsers(newUser)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Registro de Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de usuario"
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Correo electrónico"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            style={{ marginTop: "20px" }}
          >
            Registrar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Register
