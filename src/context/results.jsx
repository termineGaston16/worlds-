import { createContext, useState } from "react";

export const ResultsContext = createContext();

export function ResultsProvider({ children }) {
    const [url, setUrl] = useState(null);
    const [results, setResults] = useState(null);
    const [uniqueResult, setUniqueResult] = useState(null);
    const [controller, setController] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [limits, setLimits] = useState({ min: 0, max: 10, pagesMax: 0 });

    /* Realizar llamado a la API */
    const callToApi = (urlLink, unico) => {
        const newLimits = urlLink ? { min: 0, max: 10, pagesMax: 0 } : { min: limits.min + 10, max: limits.max + 10 };
        if (urlLink) {
            setResults(null);
        }

        const finalUrl = urlLink || url; // Usa urlLink si está definido, de lo contrario usa url

        setLoading(true);
        const abortController = new AbortController();
        setController(abortController);

        fetch(finalUrl, { signal: abortController.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al llamar API");
                }
                return response.json();
            })
            .then((data) => {
                setError(null);

                if (unico) {
                    setResults(data)
                } else {
                    newLimits.pagesMax = data.length;
                    setResults((prevResults) =>
                        prevResults ? [...prevResults].concat(data.slice(newLimits.min, newLimits.max)) : data.slice(0, 10)
                    );
                }
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    setError("Llamada cancelada por el usuario.");
                } else {
                    setError("Búsqueda no encontrada.");
                    console.error(error);
                }
            })
            .finally(() => {
                setLoading(false);
                setLimits(newLimits);
            });
    };

    /* Abortar llamado a la API */
    const handleCancelRequest = () => {
        if (controller) {
            setLoading(false);
            controller.abort();
            setError("Llamada cancelada por el usuario.");
        }
    };

    /* limpiar resultados */
    const clearResults = () => {
        setUrl(null)
        setResults(null);
        setUniqueResult(null)
        setController(null)
        setLoading(false);
        setError(null);
        setLimits({ min: 0, max: 10, pagesMax: 0 });

    };

    return (
        <ResultsContext.Provider
            value={{
                results,
                loading,
                error,
                limits,
                uniqueResult,
                setUrl,
                setResults,
                setError,
                callToApi,
                handleCancelRequest,
                setUniqueResult, clearResults
            }}
        >
            {children}
        </ResultsContext.Provider>
    );
}
