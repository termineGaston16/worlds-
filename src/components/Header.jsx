import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="header-Header" style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: "2rem" }}>
            <div className="header-div-Header"><a className="header-div-link-Header" href="https://restcountries.com/" target="_blank">API utilizada</a></div>
            <div className="header-div-Header"><Link className="header-div-link-Header" to={"/"}>Worlds!</Link></div>
            <div className="header-div-Header">proyect by <span className="span-copyRight">KDA/NOVA</span> ©2024</div>
        </header>
    )
}