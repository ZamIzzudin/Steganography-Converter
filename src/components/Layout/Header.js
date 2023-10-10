import { Link } from "react-router-dom"


import style from '../../styles/layout/header.module.css'

// import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/images/logo.jpg'

const Header = () => {

  // const sidebarOverlay = () => {
  //   document.querySelector(".sidebar-overlay").classList.toggle("opened");
  //   document.querySelector(".sidebar").classList.toggle("active");
  // };
  return (
    <header>
      <div className={`container ${style.nav__container}`}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} alt='logo' />
          </Link>
          <span>Steganography Converter</span>
        </div>
        {/* <div className={style.menu} onClick={sidebarOverlay}>
          <MenuIcon />
        </div> */}

      </div>
    </header>
  )
}

export default Header