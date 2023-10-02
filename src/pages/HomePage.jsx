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
            <h1  className="pb-3 pt-4 ps-5 mb-4">WikiCountries: Your Guide to the World</h1>

            <ul className="list-group ms-5 me-5">
                {countries.map(country => (

                        <li key={country._id} className="list-group-item">
                            <Link to={`/${country.alpha3Code}`} style={{textDecoration: "none"}}>
                            <div className="justify-content-center align-items-center" style={{display: "flex", flexDirection: "row", alignContent:"center"}}>
                                <img className="me-3" src={`https://flagpedia.net/data/flags/icon/20x15/${country.alpha2Code.toLowerCase()}.png`}/>
                                <p className="align-self-center mb-0" style={{textDecoration: "none", color: "black"}}>{country.name.common}</p>
                            </div>
                            </Link>

                        </li>

                ))}
            </ul>
        </>
    )
}

export default HomePage;
