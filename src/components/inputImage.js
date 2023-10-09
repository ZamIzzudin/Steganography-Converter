import { useState, useRef, useEffect } from 'react'

import style from '../styles/formLayout.module.css'

export default function InputImage({ getData, currentData }) {
    const [showImage, setShowImage] = useState(currentData?.detail || currentData || null)

    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const addImageButton = () => {
        fileInputRef.current.click();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file !== undefined) {
            handleFile(file)
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file !== undefined) {
            handleFile(file)
        }
    };

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = function () {
            const { result } = reader;
            const detail = {
                src: result,
                name: file.name,
            };
            setShowImage(detail);
            getData({
                file,
                detail,
            })
        };
        reader.readAsDataURL(file);
    }

    function deleteImage() {
        setShowImage(null);
        getData(null)
    }

    useEffect(() => {
        setShowImage(currentData?.detail || currentData || null)
    }, [currentData])

    return (
        <div className={style.input_area}>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={style.form_image}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
                {showImage ? (
                    <>

                        <div className={style.image_display_card}>
                            <img src={showImage.src} alt="raw pict" className={style.image_thumbnail} />
                            <span>
                                {showImage?.name || showImage}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className={style.non_image_display_card} onClick={addImageButton}>
                        <span>Drag and drop here</span>
                        <span>Or</span>
                        <span className={style.text_browse}>Browse</span>
                    </div>
                )}
                <div className={style.cta_button}>
                    <button type="button" onClick={addImageButton}>Select file</button>
                    {showImage ? (<button onClick={() => deleteImage()}>Delete</button>) : null}
                </div>
            </div>
        </div>
    )
}