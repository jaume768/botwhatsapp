const config = require('dotenv')

const PORT = (process.env.PORT) || 3000
const DB_HOST = (process.env.DB_HOST) || 'localhost'
const DB_PORT = (process.env.DB_PORT) || 3306
const DB_USER = (process.env.DB_USER) || 'root'
const DB_DATABASE = (process.env.DB_DATABASE) || 'botwhatsapp'
const DB_PASSWORD = (process.env.DB_PASSWORD)

module.exports = {DB_HOST,DB_PORT,DB_USER,DB_DATABASE,DB_PASSWORD,PORT}