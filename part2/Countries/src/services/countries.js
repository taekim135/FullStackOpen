import axios from "axios";


const url = "https://studies.cs.helsinki.fi/restcountries/api/"


const getAll = () =>{
    const request = axios.get(url+"all")
    console.log('Initial data fetched');
    return request.then(response => response.data)

}


const lookup = (country) =>{
    const request = axios.get(url+"name/"+country)
    return request.then(response=>{
        return response.data
    }).catch (error=>{
        console.log("target failed:", error);
    })
}





export default {getAll, lookup}