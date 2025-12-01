const Country = (prop) =>{
    if (prop.length < 10 && prop.length > 1){
        return  <ul><li>{prop.name}</li></ul>
    }
           
    return(  
        <>
            <h1>{prop.name}</h1>
            
            Capital: {prop.capital.map(cap => <ul key ={cap}><li>{cap}</li></ul>)}
            <p>Area: {prop.area}</p>
            Languages: {Object.values(prop.languages).map(lang => <ul key ={lang}><li>{lang}</li></ul>)}
            <p>Population: {prop.population}</p>
            <h1>{prop.flag}</h1>
        </> 
    ) 
}


export default Country;