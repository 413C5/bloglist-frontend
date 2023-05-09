import axios from 'axios'

//Componentes que manejan la comunicación con el servidor
const url = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(url)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${url} /${id}`, newObject)
  const response = await request
  return response.data
}

const blogService = {
  setToken,
  getAll,
  create,
  update
}

export default blogService
