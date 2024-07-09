import {  useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import { useContext } from "react";
import { ResultsContext } from "../context/results";

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
        <form onSubmit={handleSubmit}>
            <input type="search" name="inputSearchCountries" />
            <button type="submit">search</button>
        </form>
    )
}