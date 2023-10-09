import React from 'react'

import style from '../../styles/layout/header.module.css'

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../assets/images/logo.png'

const Header = () => {
  return (
    <header>
      <div className={`container ${style.nav__container}`}>
        <div className={style.logo}>
          <img src={logo} alt='logo' />
          <span>Steganography</span>
        </div>
        <div className={style.menu}>
          <MenuIcon />
        </div>
        
      </div>
    </header>
  )
}

export default Header