import React, { useEffect, useState } from 'react'
import './App.css'
import { apiClima } from "./services/apiClima"
import { apiCidadeIP } from "./services/apiCidadeIP"

import { FaTemperatureHigh, FaWind } from "react-icons/fa"


function App() {

  const [weather, setWeather] = useState()
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("")
  const [lista, setlista] = useState([]);






  async function handleGetWeather(event) {
    event.preventDefault()
    const response = await apiClima.get(search)
    setCity(search)
    console.log(response.data)
    setWeather(response.data)

    const minhaLista = localStorage.getItem('listacidades')
    let cidadesSalvas = JSON.parse(minhaLista) || []

    const hasCity = cidadesSalvas.some((cidadeSalva) => cidadeSalva === search.toUpperCase())
    //alert(cidadesSalvas)
    if (!hasCity) {
      cidadesSalvas.push(search.toUpperCase());
      localStorage.setItem('listacidades', JSON.stringify(cidadesSalvas));
    }
    
setlista(cidadesSalvas)





  }
 

  async function handleGetCidadeIP() {

    const responseCity = await apiCidadeIP.get()
    const response = await apiClima.get(responseCity.data.city)
    setCity(responseCity.data.city)
    console.log(responseCity.data.city)
    setWeather(response.data)

    alert(responseCity.data.query)

  }


  useEffect(() => {
    handleGetCidadeIP()
    const minhaLista = localStorage.getItem('listacidades');
    setlista(JSON.parse(minhaLista) || [])
  }, [])
  return (
    <div>
      {/* <h1>{"Hello World".toUpperCase()}</h1>
   <HelloWorld/> */}
      <header className="menu">
        <div className="cont">
          <form onSubmit={handleGetWeather} >
            <input className="css-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>
          <button className="myButton" onClick={handleGetWeather}>Buscar</button>
          <h2>Veja o clima de diversas cidades</h2>
        </div>
      </header>
      {weather &&
        <main className="conteudo">
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

          <section>
            <br /><br /><br />
            <h1>Cidades Pesquisadas</h1>
            <ul>
              {lista.map((item) => {
                return (

                  <li key={item}>
                    <span>{item}</span>

                  </li>

                )
              })}
            </ul>
          </section>
        </main>
      }
    </div>
  )
}

export default App
