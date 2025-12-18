import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { user, setShowUser, logout } = useContext(AppContext);

    return (
        <div className='flex absolute z-10 h-20 w-full justify-between items-center px-10 py-10 bg-gray-700 text-white'>
            <div>
                <Link to='/'>
                    Suraj
                </Link>
            </div>
            {
                user ? <div className='flex gap-10 max-sm:hidden'>
                    <Link to='/about'>
                        About
                    </Link>
                    <Link to='/contact'>
                        Contact
                    </Link>
                    <Link to='/services'>
                        Services
                    </Link>
                </div> : ''
            }
            <div>
                {
                    user ? (
                        <button onClick={logout} className='bg-red-600 px-5 py-2 cursor-pointer'>Logout</button>)
                        :
                        <Link to='/login'>
                            <button className='bg-blue-600 px-5 py-2 cursor-pointer'>Login</button>
                        </Link>
                }

            </div>

        </div>
    )
}


export default Navbar