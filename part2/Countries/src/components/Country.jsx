import weatherAPI from "../services/weather";
import { useState, useEffect } from "react";


const Country = (prop) =>{
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)
    const [code, setCode] = useState("")
    const url = "https://openweathermap.org/img/wn/"


    // when to trigger weather api 
    useEffect(()=>{
        if (prop.length === 1){
            weatherAPI
            .getWeather(prop.capital)
            .then(data => {
                setTemp(data.main.temp)
                setWind(data.wind.speed)
                setCode(data.weather[0].icon)
                })
        }
    },[prop.length, prop.capital])


    if (prop.length <= 10 && prop.length > 1){
        return  <ul><li>{prop.name} <button onClick ={()=>prop.onClick(prop.name)}>Show</button></li></ul>
    }

    return(  
        <>
            <h1>{prop.name}</h1>
            <h3>Capital </h3>{prop.capital.map(cap => <ul key ={cap}><li>{cap}</li></ul>)}
            <p><b>Area:</b> {prop.area}</p> 
            <h3>Languages </h3> {Object.values(prop.languages).map(lang => <ul key ={lang}><li>{lang}</li></ul>)}
            <p><b>Population: </b>{prop.population}</p>
            <h1>{prop.flag}</h1>
            <h3>Weather in {prop.capital}</h3>
            <p>Temperature: {Math.round(Number(temp))+'\u00B0C'}</p>
            <p>Wind: {Math.round(Number(wind))+'km/h'}</p>
            {code && <img src = {url+code+"@2x.png"}></img>}
        </> 
    ) 
}


export default Country;