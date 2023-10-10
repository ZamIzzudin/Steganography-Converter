import React from 'react'

import style from '../../styles/layout/header.module.css'

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/images/logo.png'

const Header = () => {

  const sidebarOverlay = () => {
    document.querySelector(".sidebar-overlay").classList.toggle("opened");
    document.querySelector(".sidebar").classList.toggle("active");
  };
  return (
    <header>
      <div className={`container ${style.nav__container}`}>
        <div className={style.logo}>
          <img src={logo} alt='logo' />
          <span>Steganography</span>
        </div>
        <div className={style.menu} onClick={sidebarOverlay}>
          <MenuIcon />
        </div>
        
      </div>
    </header>
  )
}

export default Header