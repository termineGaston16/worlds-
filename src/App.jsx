import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Header = lazy(() => import("./components/Header"))
const Home = lazy(() => import("./components/Home"))
const Search = lazy(() => import("./components/Search"))
const Results = lazy(() => import("./components/Results"))

const ResultsProvider = lazy(() => import("./context/results").then(module => ({ default: module.ResultsProvider })))

export default function App() {
    return (<>
        <BrowserRouter>
            <Suspense fallback={<h3 style={{marginTop:"10rem", color:"white", textShadow:"0px 0px 1rem black"}}>Cargando App...</h3>}>
                <Header />

                <ResultsProvider>
                    <Home />
                    <Search />
                    
                    <Routes>
                        <Route exact path="/" element={null} />
                        <Route exact path="*" element={<h2>Pagina no encontrada</h2>} />

                        <Route exact path="/results" element={<Results />} />
                    </Routes>
                </ResultsProvider>
            </Suspense>
        </BrowserRouter>
    </>)
}