// Library
import { Link } from "react-router-dom"

// Style
import style from '../../../styles/home/home.module.css'

// Assets
import Jumbo from '../../../assets/video/jumbo.mp4'
import JumboThumb from '../../../assets/images/jumbo-thumb.png'

export default function Jumbotron() {
    return (
        <div className={style.jumbotron}>
            <div className={style.jumbotron_content}>
                <h1>STEGANOGRAPHY</h1>
                <p>Embed, encrypt, and decrypt your text with Steganography</p>
                <Link to="/steganography">
                    <button>Get Started</button>
                </Link>
            </div>
            <video className={style.jumbotron_video} width="100%" height="100%" autoPlay="autoplay" loop="loop" muted poster={JumboThumb}>
                <source src={Jumbo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}