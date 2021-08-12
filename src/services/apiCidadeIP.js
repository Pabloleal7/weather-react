import axios from "axios"

export const apiCidadeIP = axios.create({
  baseURL:'http://ip-api.com/json'
})