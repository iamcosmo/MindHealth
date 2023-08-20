import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import darkTheme from './assets/themes/darkTheme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ThemeProvider>,
)
