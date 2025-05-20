import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data

}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log("Response from server when new blog was added: ", response)
  
  return response.data
}

const update = async blogObject => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.put(baseUrl + `/${blogObject.id}`, blogObject, config)
  console.log("Response from server when blog was updated: ", response)

  return response.data
}


const deleteBlog = async blogID => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.delete(baseUrl + `/${blogID}`, config)
  console.log("Response from server when the blog was deleted: ", response)

  return response.data
}

export default { getAll, create, setToken, update, deleteBlog }