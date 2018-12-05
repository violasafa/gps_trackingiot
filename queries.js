const Pool = require('pg').Pool
const pool = new Pool({
  user: 'iolmokgz ',
  host: 'baasu.db.elephantsql.com',
  database: 'iolmokgz',
  password: '27n2gMVqUp0aRGCznIrI-YPsLTPSXPoG',
  port: 5433,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM Users ORDER BY id ASC', (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM T_besar WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}

const createUser = (request, response) => {
  const { latitude,longitude,time } = request.body

  pool.query('INSERT INTO T_besar (latitude,longitude,time) VALUES ($1,$2,$3)', [latitude,longitude,time], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { latitude, longitude, time} = request.body

  pool.query(
    'UPDATE Users SET latitude = $1, longitude = $2, time =$3, WHERE id = $4',
    [latitude, longitude, time, id],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
