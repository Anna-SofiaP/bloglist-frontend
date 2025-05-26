import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
    try {
      console.log('sending credentials...')
      const response = await axios.post(baseUrl, credentials)
      console.log('Response from server: ', response)
      return response.data
    } catch (e) {
      console.log('Error in signup: ', e)
    }
  }
  
  export default { signup }