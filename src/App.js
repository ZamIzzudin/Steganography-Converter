import InputImage from './components/inputImage'
import { useState } from 'react'
import stegano from './utils/stegano'

function App() {
  const [rawImg, setRawImg] = useState(null)
  const [embededImg, setEmbededImg] = useState(null)
  const [embedMessage, setEmbedMessage] = useState('')
  const [extractMessage, setExtractMessage] = useState('Message from extract')


  function embedImage() {
    if (rawImg === null) {
      alert('Image Not Found')
    } else if (embedMessage === '') {
      alert('Massage Not Found')
    } else {
      stegano.embed(rawImg.detail.src, embedMessage)
    }
  }


  function extractImage() {
    if (embededImg === null) {
      alert('Image Not Found')
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

  return (
    <div className="App">
      <h1>Steganografi Converter</h1>

      <div>
        <span>
          {/* {rawImg ? (<img src={rawImg.detail.src} alt="raw pict" />) : (null)} */}
        </span>
        <h2>Embed</h2>
        <InputImage getData={setRawImg} />
        <textarea onChange={(e) => setEmbedMessage(e.target.value)} />
        <button onClick={() => embedImage()}>Embed</button>
      </div>

      <div>
        <h2>Extract</h2>
        <InputImage getData={setEmbededImg} />
        <span>{extractMessage}</span>
        <button onClick={() => extractImage()}>Extract</button>

      </div>
    </div>
  );
}

export default App;
