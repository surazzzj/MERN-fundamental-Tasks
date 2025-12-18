import LoginSignup from './components/LoginSignup'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'

const App = () => {
  return (
    <div className='overflow-y-hidden'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
    </div>
  )
}

export default App