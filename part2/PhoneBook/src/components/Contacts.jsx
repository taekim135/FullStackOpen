import Person from "./Person";


const Contacts = (prop) => {
    return prop.list.map(person =>  
            <Person id = {person.id} key = {person.id} name = {person.name} number = {person.number} clickCall = {prop.clickCall}/>
    )

}


export default Contacts;