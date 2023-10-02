import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function CountryDetails() {
    const { countryId } = useParams();

    const [country, setCountry] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCountry(){
        const response =  await fetch(`https://ih-countries-api.herokuapp.com/countries/${countryId}`);
        if (response.ok){
            const parsed = await response.json()
            setCountry(parsed);
            setIsLoading(false);
            console.log(parsed)
        }
    } 

    useEffect(()=> {
        fetchCountry();
    }, [country] )

    return isLoading ? ( <h1>Loading…</h1>) : (
        <>
            <h1>Country Details</h1>
            <img src={`https://flagpedia.net/data/flags/icon/256x192/${country.alpha2Code.toLowerCase()}.png`}/>
            <h2>{country.name.common}</h2>


            <table className="table">
                    <thead>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row"></th>
                            <td>Capital</td>
                            <td>{country.capital[0]}</td>
                        </tr>
                        <tr>
                        <th scope="row"></th>
                            <td>Area</td>
                            <td>{country.area} km<sup>2</sup></td> 
                        </tr>
                        <tr>
                        <th scope="row"></th>
                            <td>Borders</td>
                            <td>
                            <ul>
                                {country.borders.map((x) => {
                                    return (
                                        <li key={x.index} style={{ listStyleType: "none" }}>
                                            <Link to={`/${x}`}>
                                                <p> {x}</p>
                                            </Link>
                                        </li>
                                    )})}
                            </ul>
                            </td>
                        </tr>
                    </tbody>
            </table>
        </>
    )
}

export default CountryDetails;
