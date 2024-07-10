//AboutController, InfinityScroll, Paginacion

import { useCallback, useContext, useEffect } from "react";
import { ResultsContext } from "../context/results"
import "../css/results.css"


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
        <div className="div-limit-Results">
            <span>Nombre Oficial</span>
            <span>{(results[0].name.official) ? results[0].name.official : "Desconocido"}</span>

            <span>Nombre Nativo</span>
            <span>{(Object.values(results[0].name.nativeName)[0].common) ? Object.values(results[0].name.nativeName)[0].common : "Desconocido"}</span>
            <span>{(results[0].independent) ? "País independiente" : ""}</span>


            <span>Código de País:</span>
            <span>{(results[0].cca2) ? results[0].cca2 : ""}</span>
            <span>{(results[0].ccn3) ? results[0].ccn3 : ""}</span>
            <span>{(results[0].cca3) ? results[0].cca3 : ""}</span>
            <span>{(results[0].cioc) ? results[0].cioc : ""}</span>

            <span>Capital: </span>
            <span>{(results[0].capital) ? results[0].capital : "Desconocida"}</span>

            <span>Región: </span>
            <span>{(results[0].region) ? results[0].region : "Desconocida."}</span>

            <span>Lenguaje: </span>
            <span>{(results[0].languages) ? (

                Object.values(results[0].languages).map((lang, index) => (
                    <span key={index}>{lang} </span>
                ))

            ) : "Desconocida"}</span>
        </div>
    </>)

    // Si hay resultados generales
    if (results) return (<>
        <div className="div-limit-Results">
            {loading && <h3 className="alert-Results">Buscando...</h3>}
            {results && (<>
                <ul className="ul-Results">
                    {results.map(country => (
                        <li className="ul-li-Results" onClick={() => { setUniqueResult(true), callToApi(`https://restcountries.com/v3.1/name/${country.name.common}?fullText=true`, "unico") }} key={country.name.common}>
                            <span className="ul-li-title-Results">{country.name.common}</span>
                            <img className="ul-li-img-Results" src={country.flags.png} alt={country.name.official} />
                            <span className="ul-li-sub-title-Results">{country.name.official}</span>
                        </li>
                    ))}
                </ul>

                {loading && <h3 className="alert-Results">Buscando...</h3>}
                {(limits.max < limits.pagesMax) && <button className="btn-Results" onClick={handleClick}>Cargar más...</button>}</>)
            }
        </div>
    </>)

    // Si se está cargando
    if (loading) return (
        <div className="div-limit-Results">
            <h3 className="alert-Results">Buscando...</h3>
            <button className="btn-Results" onClick={() => handleCancelRequest()}>Cancelar busqueda</button>
        </div>)

    // Si hubo error
    if (error) return (
        <div className="div-limit-Results">
            <span className="alert-Results">{error}</span>
        </div>
    )

    // Si no hubo nada
    if (!results) return null;


}



