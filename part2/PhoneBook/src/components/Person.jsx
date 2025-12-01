const Person = (prop) => {
    if (prop.name == "" || prop.number == ""){
        return
    }
    return <p>{prop.name}: {prop.number} 
                <button onClick = {() => prop.clickCall(prop.id)}>Delete</button> 
            </p>
}



export default Person;