import App from './src/App'
import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById("app")).render(<App />)