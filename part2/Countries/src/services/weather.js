import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY


const getWeather = (city) =>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric` 

    return axios.get(url)
    .then(response => response.data)
    .catch(error =>{
        console.log('Failed to fetch weather from '+ city, error);
    })

}


export default {getWeather}