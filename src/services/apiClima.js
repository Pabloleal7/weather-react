import axios from "axios"

export const apiClima = axios.create({
  baseURL:'https://goweather.herokuapp.com/weather/'
})