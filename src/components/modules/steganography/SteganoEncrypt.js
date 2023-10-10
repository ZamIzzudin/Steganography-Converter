import InputImage from '../../tools/inputImage'
import { useState } from 'react'
import stegano from '../../../utils/stegano'

import style from '../../../styles/stegano/stegano.module.css'

import CustomSnackbar from '../../tools/Snackbar';

function SteganographyEncrypt() {
  const [rawImg, setRawImg] = useState(null)
  const [embedMessage, setEmbedMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarBackground, setSnackbarBackground] = useState('');


  function embedImage() {
    if (rawImg === null) {
      setSnackbarMessage('Please insert an image!');
      setSnackbarOpen(true);
      setSnackbarBackground('red');
    } else if (embedMessage === '') {
      setSnackbarMessage('Please input a message!');
      setSnackbarOpen(true);
      setSnackbarBackground('red');
    } else {
      stegano.embed(rawImg.detail.src, embedMessage)
    }
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  return (
      <div className={style.stegano}>
        <div className={style.image__input}>
          <InputImage getData={setRawImg} />
        
          <button onClick={() => embedImage()} className={style.encrypt}>Embed Message</button>
          <CustomSnackbar
              open={snackbarOpen}
              message={snackbarMessage}
              onClose={handleSnackbarClose}
              backgroundColor={snackbarBackground}
            />
        </div>
        <div className={style.message__input}>
          <textarea placeholder='Enter your message' onChange={(e) => setEmbedMessage(e.target.value)} value={embedMessage} />
        </div>
      </div>
  );
}

export default SteganographyEncrypt;
