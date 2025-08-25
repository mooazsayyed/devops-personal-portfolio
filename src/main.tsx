import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import WorkDisplay from './pages/WorkDisplay'
// import TestWorkDisplay from './pages/TestWorkDisplay'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkDisplay />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
