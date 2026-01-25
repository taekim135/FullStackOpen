import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const clearToken = () =>{
  token = null
}

const postBlog = async (newBlog) => {
  const header = { headers: {"Authorization": token}}

  const response = await axios.post(baseUrl,newBlog, header)
  return response.data
} 


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, setToken, clearToken, postBlog }