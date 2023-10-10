import { useState } from 'react';

import style from '../../styles/stegano/stegano.module.css'

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import SteganographyEncrypt from '../../components/modules/steganography/SteganoEncrypt';
import SteganographyDecrypt from '../../components/modules/steganography/SteganoDecrypt';

function Steganography() {
  const [selected, setSelected] = useState(0);
  return (
    <div className='container'>
      <div className={style.tab}>
        <button className={`${style.tab__button} ${selected === 0 ? style.active : ''}`} onClick={() => setSelected(0)}>
            <LockIcon />
            <span>Encrypt</span>
        </button>
        <button className={`${style.tab__button} ${selected === 1 ? style.active : ''}`} onClick={() => setSelected(1)}>
            <LockOpenIcon />
            <span>Decrypt</span>
        </button>
      </div>
      
      <div className={style.stegano__container}>
        {selected === 0 ? <SteganographyEncrypt /> : selected === 1 ? <SteganographyDecrypt /> : null}
      </div>
    </div>
  );
}

export default Steganography;
