import React, { useEffect, useState } from 'react'
import './App.css'
import { apiClima } from "./services/apiClima"
import { apiCidadeIP } from "./services/apiCidadeIP"

import { FaTemperatureHigh, FaWind } from "react-icons/fa"


function App() {

  const [weather, setWeather] = useState()
  const [city, setCity] = useState("")
  const [search,setSearch] = useState("")



  async function handleGetWeather(event) {
    event.preventDefault()
    const response = await apiClima.get(search)
    setCity(search)
    console.log(response.data)
    setWeather(response.data)
  }

  async function handleGetCidadeIP() {
    
    const responseCity = await apiCidadeIP.get()
    const response = await apiClima.get(responseCity.data.city)
    setCity(responseCity.data.city)
    console.log(responseCity.data.city)
    setWeather(response.data)

    
    
  }


  useEffect(() => {
    handleGetCidadeIP()
  })
  return (
    <div>
      {/* <h1>{"Hello World".toUpperCase()}</h1>
   <HelloWorld/> */}
      <header>
        <form onSubmit={handleGetWeather} >
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
        <button onClick={handleGetWeather}>Buscar</button>
      </header>
      {weather &&
        <main>
          {/* {JSON.stringify(weather)} */}
          <h1>{city.toUpperCase()}</h1>

          <section className="current-weather">
            <h2>Clima Atual</h2>
            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </section>
          <section className="forecast">
            <h2>Previsão</h2>
            <ol>
              {weather.forecast.map(day => (
                <li>
                  <div>
                    <FaTemperatureHigh />
                    <p>{day.temperature}</p>
                  </div>
                  <div>
                    <FaWind />
                    <p>{day.wind}</p>
                  </div>
                </li>
              )

              )}
            </ol>

          </section>
        </main>
      }
    </div>
  )
}

export default App
