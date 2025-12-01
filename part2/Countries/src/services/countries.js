import axios from "axios";


const url = "https://studies.cs.helsinki.fi/restcountries/api/"




const getAll = () =>{
    const request = axios.get(url+"all")
    return request.then(response => response.data)

}


const lookup = (country) =>{
    const request = axios.get(url+"name/"+country)

    return request.then(response=>{
        console.log('one country:', response.data);
        return response.data
    })
}





export default {getAll, lookup}