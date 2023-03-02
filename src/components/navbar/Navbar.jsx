import './navbar.css'

import { RiCustomerService2Fill } from 'react-icons/ri'
import { MdOutlineLogin } from 'react-icons/md'
import { BsCardChecklist } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import logo from './logoext.svg'

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to='/' className="navbar-link left">
                    <img src={logo} alt="logo" className='logo'/>
                </Link>
                <Link to='/enjoy' className="navbar-link left">
                    <RiCustomerService2Fill className='icon' />
                    <span>ENJOY</span>
                </Link>
            </div>

            <div className="nav-right">
                <Link to='/favorit' className="navbar-link left">
                    <BsCardChecklist className='icon' />
                    <span>MY LIST</span>
                </Link>
                <Link to="/login" className="navbar-link left">
                    <MdOutlineLogin className='icon' />
                    <span>LOGIN</span>
                </Link>
            </div>

        </nav>
    )

}


export default Navbar