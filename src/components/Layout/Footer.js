import React from 'react'

import style from '../../styles/layout/footer.module.css'

import { Avatar } from '@mui/material'

import profile1 from '../../assets/images/profile.jpeg'

import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
  return (
    <footer>
        <div className={`container ${style.footer__container}`}>
            <div className={style.footer__header}>
                {isMobile ? <h1>OUR TEAM</h1> : <><h1>OUR</h1><h1>TEAM</h1></>}
            </div>
            <div className={style.footer__content}>
                <div className={style.content__item}>
                    <div className={style.item__image}>
                        <Avatar sx={{width: 65, height: 65}} src={profile1} alt='Wildan Nur Rahman' />
                    </div>
                    <div className={style.item__details}>
                        <h5>Wildan Nur Rahman</h5>
                        <span>11200930000006</span>
                    </div>
                </div>
                <div className={style.content__item}>
                    <div className={style.item__image}>
                        <Avatar sx={{width: 65, height: 65}} src={profile1} alt='Dwiki Putra' />
                    </div>
                    <div className={style.item__details}>
                        <h5>Dwiki Putra Pinontoan</h5>
                        <span>11200930000028</span>
                    </div>
                </div>
                <div className={style.content__item}>
                    <div className={style.item__image}>
                        <Avatar sx={{width: 65, height: 65}} src={profile1} alt='Azzam Izzudin' />
                    </div>
                    <div className={style.item__details}>
                        <h5>Azzam Izzudin Hasan</h5>
                        <span>11200930000030</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer