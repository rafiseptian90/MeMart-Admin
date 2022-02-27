// axios
import axios from 'axios'

const baseURL = 'http://api-memart.test/api/v1'

export default axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Accept': 'application/json'
  }
})
