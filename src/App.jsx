import './App.css'
import NavBar from './components/navbar'
import Dashboard from './pages/dashboard'
import HelpPage from './pages/help';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='bg-gray-200 w-screen flex items-center justify-center top-0 z-50 sticky'>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App