import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    console.log('sending credentials...')
    const response = await axios.post(baseUrl, credentials)
    console.log('Response from server: ', response)
    return response.data
  } catch (e) {
    console.log('Error in login: ', e)
  }
}

export default { login }