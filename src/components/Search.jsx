import {  useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { useContext } from "react";
import { ResultsContext } from "../context/results";
import "../css/search.css"

export default function Search() {

    const { validateQuery } = useSearch();
    const {clearResults} = useContext(ResultsContext)
    const navigation = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        clearResults()
        const query = new window.FormData(event.target).get("inputSearchCountries")
        validateQuery(query)
        navigation("/results")
    }

    return (
        <form className="form-Search" onSubmit={handleSubmit}>
            <input className="form-input-Search" type="search" name="inputSearchCountries" />
            <button className="form-button-Search" type="submit">buscar</button>
        </form>
    )
}