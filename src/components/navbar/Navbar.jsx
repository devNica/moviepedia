import './navbar.css'

import { RiCustomerService2Fill } from 'react-icons/ri'
import { MdOutlineLogin } from 'react-icons/md'


const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="/" className="navbar-link left">
                    <RiCustomerService2Fill className='icon'/>
                    <span>ENJOY</span>
                </a>
            </div>

            <div className="nav-right">
                <a href="/" className="navbar-link left">
                    <MdOutlineLogin className='icon'/>
                    <span>LOGIN</span>
                </a>
            </div>

        </nav>
    )

}


export default Navbar