import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import HelloWorld from './components/HelloWorld'
import { api } from "./services/api"


function App() {

  const [weather, setWeather] = useState()
  const city = "Itaberaba"


  async function handleGetWeather() {
    const response = await api.get(city)
    console.log(response.data)
    setWeather(response.data)
  }


  useEffect(()=>{
    handleGetWeather()
  })
  return (
    <div>
      {/* <h1>{"Hello World".toUpperCase()}</h1>
   <HelloWorld/> */}
     {/*  <header>
        <button onClick={handleGetWeather}>Enviar</button>
      </header> */}
      {weather &&
        <main>
          {/* {JSON.stringify(weather)} */}
          <h1>{city}</h1>

          <section>
            <h2>Clima Atual</h2>
            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </section>
          <section>
            <h2>Previsão</h2>
            {weather.forecast.map(day => (
              <li>
                <p>{day.temperature}</p>
                <p>{day.wind}</p>
              </li>
            )

            )}

          </section>
        </main>
      }
    </div>
  )
}

export default App
