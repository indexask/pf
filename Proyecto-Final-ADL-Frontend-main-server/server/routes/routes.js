const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
require("dotenv").config()

const {
  registration,
  obtainUser,
  verifyUser,
  getProducts,
  getProductByCategory,
  getCartProducts,
  createProduct
} = require("../consultas/consultas")
const {
  checkCredentialsExist,
  tokenVerification,
} = require("../middleware/middleware")

router.get("/", (req, res) => {
  res.send("Hello World")
})

router.post("/usuarios", checkCredentialsExist, async (req, res) => {
  try {
    const usuarios = req.body
    await registration(usuarios)
    res.send("Usuario registrado con éxito!")
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/usuarios", tokenVerification, async (req, res) => {
  try {
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    const { email } = jwt.decode(token)
    const usuario = await obtainUser(email)
    res.json(usuario)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    await verifyUser(email, password)
    const token = jwt.sign({ email }, process.env.SECRET)
    res.send({ email, token })
  } catch (error) {
    res.status(500).send(error)
  }
})
router.get("/products", async (req, res) => {
  try {
    const products = await getProducts()
    res.json(products)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/products", async (req, res) => {
  try {
    const productos = req.body
    await createProduct(productos)
    res.send("Producto Agregado con Exito")
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/products/category/:category", async (req, res) => {
  try {
    const category = req.params.category
    const products = await getProductByCategory(category)
    res.json(products)
  } catch (error) {
    console.error("Error al procesar la solicitud:", error)

    res.status(500).send(error)
  }
})

router.get("/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId
    const cartProducts = await getCartProducts(userId)
    res.json(cartProducts)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los productos del carrito de compras" })
  }
})
module.exports = router
