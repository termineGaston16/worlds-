//AboutController, InfinityScroll, Paginacion

import { useCallback, useContext, useEffect } from "react";
import { ResultsContext } from "../context/results"
import "../css/results.css"


export default function Results() {

    const { results, loading, error, limits, uniqueResult, callToApi, handleCancelRequest, setUniqueResult, clearResults } = useContext(ResultsContext)

    const handleClick = () => {
        callToApi()
    }

    const showResults = (result, isTrue, isFalse) => {
        return (result) ? isTrue : isFalse
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

            <div className="div-contenedor-Results">
                <div className="div-contenedor-parte1-Results">
                    <div className="div-contenedor-parte1-title-Results">

                        {/* Nombre Nativo */}
                        <div className="div-contenedor-parte1-title-nombreNativo-Results">
                            <span className="div-contenedor-parte1-title-TitleSpan-Results">Nombre Nativo</span>
                            <span className="div-contenedor-parte1-title-nameCountry-Results">{showResults(Object.values(results[0].name.nativeName)[0].common, Object.values(results[0].name.nativeName)[0].common, "Desconocido")}</span>

                            {/* ¿País Independiente? */}
                            <span className="div-contenedor-parte1-title-paisIndependiente-Results">{showResults(results[0].independent, "País independiente", "")}</span>
                        </div>


                        {/* Nombre Oficial */}
                        <div className="div-contenedor-parte1-title-nombreOficial-Results">
                            <span className="div-contenedor-parte1-title-TitleSpan-Results">Nombre Oficial</span>
                            <span className="div-contenedor-parte1-title-nameOficial-Results">{showResults(results[0].name.official, results[0].name.official, "Desconocido")}</span>
                        </div>
                    </div>


                    <div className="div-contenedor-parte1-BanderaYDatas-Results">

                        {/* Bandera */}
                        <div className="div-contenedor-parte1-BanderaYDatas-banderaContenedor-Results">
                            {(results[0].flags) ?
                                (<img className="div-contenedor-parte1-BanderaYDatas-banderaContenedorImg-Results" src={results[0].flags.png} alt={results[0].flags.alt} />) :
                                "Bandera no Encontrada"
                            }
                        </div>


                        <div className="div-contenedor-parte1-BanderaYDatas-dataContenedor-Results">

                            {/* Código de País: */}
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
                                <span className="div-contenedor-parte1-title-TitleSpan-Results">Código de País:</span>
                                <div style={{ listStyle: "none", display: "flex", alignContent: "center", justifyContent: "space-around", gap: "1rem", flexWrap: "wrap" }}>
                                    <span>{showResults(results[0].cca2, results[0].cca2, "")}</span>
                                    <span>{showResults(results[0].ccn3, results[0].ccn3, "")}</span>
                                    <span>{showResults(results[0].cca3, results[0].cca3, "")}</span>
                                    <span>{showResults(results[0].cioc, results[0].cioc, "")}</span>
                                </div>
                            </div>

                            {/* Capital: */}
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
                                <span className="div-contenedor-parte1-title-TitleSpan-Results">Capital: </span>
                                <span>{showResults(results[0].capital, results[0].capital, "Desconocida")}</span>
                            </div>

                            {/* Región: */}
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
                                <span className="div-contenedor-parte1-title-TitleSpan-Results">Región: </span>
                                <span>{showResults(results[0].region, results[0].region, "Desconocida")}</span>
                            </div>

                            {/* Lenguaje: */}
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
                                <span className="div-contenedor-parte1-title-TitleSpan-Results">Lenguaje: </span>
                                <span>{(results[0].languages) ? (

                                    Object.values(results[0].languages).map((lang, index) => (
                                        <span key={index}>{lang} </span>
                                    ))

                                ) : "Desconocida"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="div-contenedor-parte2-Results">
                    <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column" }}>
                        {/* Países Limítrofes: */}
                        <span className="div-contenedor-parte1-title-TitleSpan-Results">Países Limítrofes:</span>
                        {
                            (results[0].borders) ? (
                                <ul style={{ listStyle: "none", display: "flex", alignContent: "center", justifyContent: "space-around", gap: "1rem", flexWrap: "wrap" }}>
                                    {results[0].borders?.map((country, index) => (
                                        <li key={index}>{country}</li>
                                    ))}
                                </ul>
                            ) : "Sin Hermanos."
                        }
                    </div>
                    <div className="div-contenedor-parte2-contenedorlink-Results">
                        {/* Map: */}
                        <a className="div-contenedor-parte2-link-Results" href={results[0].maps.googleMaps} target="_blank"> Ir a Google Maps</a>
                    </div>
                </div>
            </div>
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



