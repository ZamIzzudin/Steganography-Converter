import InputImage from '../../tools/inputImage'
import { useState } from 'react'
import stegano from '../../../utils/stegano'

import style from '../../../styles/stegano/stegano.module.css'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CustomSnackbar from '../../tools/Snackbar';

function SteganographyDecrypt() {
  const [embededImg, setEmbededImg] = useState(null)
  const [extractMessage, setExtractMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarBackground, setSnackbarBackground] = useState('');

  function extractImage() {
    if (embededImg === null) {
      setSnackbarMessage('Please insert an image!');
      setSnackbarOpen(true);
      setSnackbarBackground('red');
      console.info("test")
    } else {
      stegano.extract(embededImg.detail.src, (message => {
        if (message === '') {
          setExtractMessage('Message Not Found')
        } else {
          setExtractMessage(message)
        }
      }))
    }
  }

  function handleCopyMessage() {
    const textArea = document.createElement('textarea');
    textArea.value = extractMessage;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    setSnackbarMessage('Successfully copied!');
    setSnackbarOpen(true);
    setSnackbarBackground('green');
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  return (
    <div className={style.stegano}>
      <div className={style.image__input}>
        <InputImage getData={setEmbededImg} />

        <button onClick={() => extractImage()} className={style.encrypt}>Extract Message</button>
      </div>
      <div className={style.message__input}>
        <textarea disabled readOnly placeholder='Your extracted message will appear here' value={extractMessage} />

        {extractMessage !== '' && (
          <>
            <button className={style.content__copy} onClick={handleCopyMessage}>
              <ContentCopyIcon />
            </button>
          </>
        )}
        <CustomSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={handleSnackbarClose}
          backgroundColor={snackbarBackground}
        />
      </div>
    </div>
  );
}

export default SteganographyDecrypt;
