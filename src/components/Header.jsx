import { Link } from "react-router-dom";
import  logoOficial  from "../../img/logoOficial.png"
import "../css/header.css"


export default function Header() {
    return (
        <header className="header-Header">
            <div className="header-limit-Header">
                <div className="header-div-Header">
                    <a className="header-div-link-Header" href="https://restcountries.com/" target="_blank">API utilizada</a>
                </div>
                <div className="header-div-Header">
                    <Link className="header-div-link-Header" to={"/"}>
                        <img className="header-div-link-img-Header" src={logoOficial} alt="logo_oficial_page" />
                    </Link>
                </div>
                <div className="header-div-Header not">proyect by  <br />
                    <span className="span-copyRight">KDA/NOVA </span>©2024</div>
            </div>
        </header>
    )
}