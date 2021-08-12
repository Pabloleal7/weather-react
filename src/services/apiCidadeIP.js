import axios from "axios"

export const apiCidadeIP = axios.create({
  baseURL:'https://ipinfo.io/json'
})