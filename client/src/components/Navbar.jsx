import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import "/src/index.css"
import infoIcon from "../assets/icons/info.png"
import userIcon from "../assets/icons/person.png"
import chartImage from "../assets/icons/chart.bar.png"
import ingresoIcon from "../assets/icons/plus.circle.png"
import historyIcon from "../assets/icons/book.pages.png"
import boxIcon from "../assets/icons/box.png"

const links = [    // Constante que contiene las rutas del proyecto
    {
        label: "Dashboard",
        route: "/dashboard",
        icon: chartImage
    }, {
        label: "Ingreso",
        route: "/purchase",
        icon: ingresoIcon
    },
    {
        label: "Venta",
        route: "/newsale",
        icon: historyIcon
    },
    {
        label: "Gestion de Stock",
        route: "/manage",
        icon: boxIcon
    },

]

const componentLinks = [
    {
        label: "Cuenta",
        route: "/account",
        icon: userIcon
    },
    {
        label: "Info",
        route: "/info",
        icon: infoIcon
    }
]

function NavBar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div className="flex flex-col items-center w-40 h-full overflow-hidden text-gray-400 bg-gray-900">
            <Link className="flex justify-center items-center w-full px-3 mt-3" to="/dashboard">
                <span className="ml-2 text-sm text-white font-bold">Distribuidora GT</span>
            </Link>

            <div className="w-full px-2 flex-1">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.route}
                            className={`flex items-center w-full h-12 px-3 mt-2 rounded 
                                        ${location.pathname.startsWith(link.route) ? 'bg-yellow-500 text-gray-300' : 'hover:bg-gray-700 hover:text-gray-300'}`}
                            onClick={() => setActiveLink(link.route)}
                        >
                            <img src={link.icon} alt={link.label}  className="h-5 w-5"/>
                            <span className="ml-2 font-medium text-white">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full px-2 mt-auto mb-4">
                <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                    {componentLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.route}
                            className={`flex items-center w-full h-12 px-3 mt-2 rounded 
                                ${activeLink === link.route ? 'bg-yellow-500 text-gray-300' : 'hover:bg-gray-700 hover:text-gray-300'}`}
                            onClick={() => setActiveLink(link.route)}
                        >
                            <img src={link.icon} alt={link.label} className="h-5 w-5"/>
                            <span className="ml-2  font-medium text-white">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
