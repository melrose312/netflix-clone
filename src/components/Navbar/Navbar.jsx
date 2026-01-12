import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useRef, useEffect } from 'react'

const Navbar = () => {

  const navRef = useRef();

  useEffect(() => {
    // Needs optimization
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav__dark')
        } else {
          navRef.current.classList.remove('nav__dark')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar__left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Series</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Languages</li>
        </ul>
      </div>
      <div className="navbar__right">
        <img src={search_icon} alt="" className='icons' />
        <p>Daniel</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar__profile">
          <img src={profile_img} alt="" className='icons' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar