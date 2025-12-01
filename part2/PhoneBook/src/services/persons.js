// this module controls all the backend communication
import axios from "axios";

const url = "http://localhost:3001/persons"

const getAll = () =>{
    const request = axios.get(url)
    return request.then((response) =>{
        console.log("Initial data fetched from the server")
        // another return here since it's another function (callback) inside then method
        return response.data
        //console.log(response.data);
    })
}

// upload new contacts to the server/phonebook
const create = (person) =>{
    const request = axios.post(url, person)
    return request.then(response => {
        console.log('Contacts added to server')
        return response.data
    })
}

const remove = (id) =>{
    const request = axios.delete(url + "/" + id)
    return request.then(response => response.data)
}


const update = (id, newNum) =>{
    const request = axios.patch(url + "/" + id, {number:newNum})
    return request.then(updated => updated.data)
}

export default {getAll, create, remove, update}

