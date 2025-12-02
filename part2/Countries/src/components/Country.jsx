import weatherAPI from "../services/weather";
import { useState } from "react";

const Country = (prop) =>{
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)

    weatherAPI
    .getWeather(prop.capital)
    .then(data => {
        //console.log(data)
        setTemp(data.main.temp)
        setWind(data.wind.speed)
    })

    if (prop.length < 10 && prop.length > 1){
        return  <ul><li>{prop.name} <button onClick ={()=>prop.onClick(prop.name)}>Show</button></li></ul>
    }

    return(  
        <>
            <h1>{prop.name}</h1>
            <h3>Capital: {prop.capital.map(cap => <ul key ={cap}><li>{cap}</li></ul>)}</h3>
            <h3>Area: {prop.area}</h3>
            <h3>Languages: {Object.values(prop.languages).map(lang => <ul key ={lang}><li>{lang}</li></ul>)}</h3>
            <h3>Population: {prop.population}</h3>
            <h1>{prop.flag}</h1>
            <h3>Weather in {prop.capital}</h3>
            <p>Temperature: {Math.round(Number(temp))+'\u00B0C'}</p>
            <p>Wind: {Math.round(Number(wind))+'km/h'}</p>
        </> 
    ) 
}


export default Country;