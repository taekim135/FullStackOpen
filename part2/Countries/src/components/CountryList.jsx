import Country from "./Country"

const CountryList = (prop) =>{
    if (prop.length > 10){
        return <p>Too many mathces, specify another filter</p>
    }

    return(
        prop.list.map(country =>

            <Country 
                key = {country.cca3}
                name = {country.name.common}
                length = {prop.length}
                capital = {country.capital} 
                flag = {country.flag} 
                area = {country.area} 
                languages = {country.languages}
                population = {country.population}
            />
        )
    )
}

export default CountryList;




