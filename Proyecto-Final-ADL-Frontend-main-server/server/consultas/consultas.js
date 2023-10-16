const pool = require("../db/conexion")
const bcrypt = require("bcryptjs")

const registration = async (usuario) => {
  let { username, email, password } = usuario
  const passwordEncoded = bcrypt.hashSync(password)
  password = passwordEncoded
  const values = [username, email, passwordEncoded]
  const consult = `INSERT INTO users VALUES (DEFAULT,$1, $2, $3)`
  await pool.query(consult, values)
}

const obtainUser = async (email) => {
  const values = [email]
  const consult = `SELECT * FROM users WHERE email = $1`

  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consult, values)

  if (!rowCount) {
    throw {
      code: 404,
      message: "Usuario no encontrado",
    }
  }
  delete usuario.password
  return usuario
}

const verifyUser = async (email, password) => {
  const values = [email]
  const consult = `SELECT * FROM users WHERE email = $1`

  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consult, values)

  const { password: passwordEncoded } = usuario
  const correctPassword = bcrypt.compareSync(password, passwordEncoded)

  if (!correctPassword || !rowCount)
    throw { code: 401, message: "Contraseña o email es incorrecto" }
}

const getProducts = async () => {
  const consult = `SELECT * FROM productos`
  const { rows } = await pool.query(consult)
  return rows
}

const createProduct = async (product) => {
  let { img, title, description, price, categoria, stock} = product
  const values = [img, title, description, price, categoria, stock]
  const consult = `INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)`
  await pool.query(consult, values)
}

const postId = async (id) =>{
  const values = [id]
  const consult = `select * from productos where id = ($1)`
  const { rows } = await pool.query(consult, values)
  return rows
}


const getProductByCategory = async (category) => {
  const query = `SELECT * FROM productos WHERE categoria = $1`
  const values = [category]
  const { rows } = await pool.query(query, values)
  return rows
}

const getCartProducts = async (userId) => {
  const query = `
    SELECT products.product_id, products.product_name, products.product_price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = $1
  `
  const values = [userId]
  const { rows } = await pool.query(query, values)
  return rows
}

module.exports = {
  registration,
  obtainUser,
  verifyUser,
  getProducts,
  getProductByCategory,
  getCartProducts,
  createProduct,
  postId
}
