import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
  // headers: {
  //   Authorization: `token ${process.env.GITHUB_TOKEN}`
  // }
})

export default instance
