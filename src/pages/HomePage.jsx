import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {

    const [countries, setCountries] = useState([]);

    async function fetchAllCountries() {
        const response = await fetch(`https://ih-countries-api.herokuapp.com/countries`);
        if (response.ok) {
            const parsed = await response.json()
            setCountries(parsed)
        }
    }

    useEffect(() => {
        fetchAllCountries()
    }, [])
    
    console.log(countries)

    return (
        <>
            <h1>WikiCountries: Your Guide to the World</h1>

            <ul className="list-group">
                {countries.map(country => (

                        <li key={country._id} className="list-group-item">
                            <Link to={`/${country.alpha3Code}`}>
                                <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}/>
                                <p>{country.name.common}</p>
                            </Link>
                        </li>

                ))}
            </ul>
        </>
    )
}

export default HomePage;
