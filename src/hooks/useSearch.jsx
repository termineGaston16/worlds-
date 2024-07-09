import { useContext, useState } from "react";
import { ResultsContext } from "../context/results"

export function useSearch() {

    const { setResults, setUrl, setError, callToApi } = useContext(ResultsContext)
    const [divisas, setDivisas] = useState(["eur", "ars", "brl", "cad", "cny", "jpn", "mxn", "gbp"])
    const [idiomas, setIdiomas] = useState(["spanish", "english", "french", "german", "chinese", "arabic", "russian", "japanese", "portuguese", "hindi"])
    const [region, setRegion] = useState(["africa", "americas", "asia", "europe", "oceania", "antarctic"])

    /* validar query con EXPRESIONES REGULARES */
    const validateQuery = (query) => {

        // Eliminar espacios en blanco al principio y al final
        const trimmedQuery = query.toLowerCase().trim();

        /* ----------------- */

        // Comprobar si la cadena está vacía
        if (trimmedQuery === "") {
            setResults(null)
            setError("Ingresa una palabra para buscar.")
            return false;
        }

        /* ----------------- */
        // Comprobar si la cadena posee números
        if (/\d/.test(trimmedQuery)) {
            setResults(null)
            setError("La búsqueda no puede poseer números.")
            return false;
        }

        /* ----------------- */
        // Comprobar si la cadena posee sólo letras y mayusculas
        const regex = /^[a-zA-Z\s]+$/; // Incluye \s para permitir espacios
        if (!regex.test(trimmedQuery)) return;

        /* ----------------- */
        // Comprobar si la búsqueda es con DIVISAS
        if (divisas.some(divisa => divisa === trimmedQuery)) {
            setUrl(`https://restcountries.com/v3.1/currency/${trimmedQuery}`)
            callToApi(`https://restcountries.com/v3.1/currency/${trimmedQuery}`)
            return;
        }

        /* ----------------- */
        // Comprobar si la búsqueda es con IDIOMA
        if (idiomas.some(idioma => idioma === trimmedQuery)) {
            setUrl(`https://restcountries.com/v3.1/lang/${trimmedQuery}`)
            callToApi(`https://restcountries.com/v3.1/lang/${trimmedQuery}`)
            return;
        }


        /* ----------------- */
        // Comprobar si la búsqueda es con REGION
        if (region.some(region => region === trimmedQuery)) {
            setUrl(`https://restcountries.com/v3.1/region/${trimmedQuery}`)
            callToApi(`https://restcountries.com/v3.1/region/${trimmedQuery}`)
            return;
        }

        /* ----------------- */
        // Busqueda NORMAL o NOMBRE
        setUrl(`https://restcountries.com/v3.1/name/${trimmedQuery}`)
        callToApi(`https://restcountries.com/v3.1/name/${trimmedQuery}`)
        return
    }

    return { validateQuery }
}