import axios from "axios"

export const apiCidadeIP = axios.create({
  baseURL:'ipinfo.io/json'
})