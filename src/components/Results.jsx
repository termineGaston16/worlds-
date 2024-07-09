//AboutController, InfinityScroll, Paginacion

import { useCallback, useContext, useEffect } from "react";
import { ResultsContext } from "../context/results"


export default function Results() {

    const { results, loading, error, limits, uniqueResult, callToApi, handleCancelRequest, setUniqueResult, clearResults } = useContext(ResultsContext)

    const handleClick = () => {
        callToApi()
    }

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading) {
            callToApi();
        }
    }, [loading, callToApi]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {

        return () => {
            clearResults()
        }
    }, [])


    // Si hay resultado único 
    if (results && uniqueResult) return (<>
        <span>{results[0].name.common}</span>
    </>)

    // Si hay resultados generales
    if (results) return (<>

        {loading && <h3>Buscando...</h3>}
        {results && (<>
            <ul style={{ listStyle: "none", width: "90vw", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                {results.map(country => (
                    <li onClick={() => { setUniqueResult(true), callToApi(`https://restcountries.com/v3.1/name/${country.name.common}?fullText=true`, "unico") }} key={country.name.common} style={{ border: "1px solid red" }}>
                        <span>{country.name.common}</span>
                        <img src={country.flags.png} alt={country.name.official} style={{ width: "80%" }} />
                        <span>{country.name.official}</span>
                    </li>
                ))}
            </ul>

            {loading && <h3>Buscando...</h3>}
            {(limits.max < limits.pagesMax) && <button onClick={handleClick}>Cargar más...</button>}</>)
        }
    </>)

    // Si se está cargando
    if (loading) return (<div>
        <h3>Buscando...</h3>
        <button onClick={() => handleCancelRequest()}>Cancelar busqueda</button>
    </div>)

    // Si hubo error
    if (error) return (<span>{error}</span>)

    // Si no hubo nada
    if (!results) return null;


}



