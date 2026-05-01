import logo from '../assets/logo_app.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className = 'w-full h-16 bg-gray-800 flex items-center justify-between px-8'>
            <Link to="/" className="text-white font-bold" >
                <img src={logo} alt="Logo" className="h-4 md:h-6 w-auto" />
            </Link>
            <div className="hidden md:flex items-center justify-between gap-8">
                <Link to="/" className="text-white font-bold">Home</Link>
                <Link to="/help" className="text-white font-bold">Help</Link>
                <Link to="/contact" className="text-white font-bold">Contact</Link>
            </div>
        </div>
    )
}

export default NavBar