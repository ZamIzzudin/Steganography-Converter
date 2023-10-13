import { createCanvas, loadImage } from 'canvas'


const stegano = (() => {

    // Fungsi untuk menyisipkan pesan dalam gambar
    function embed(imagePath, message) {
        loadImage(imagePath).then((image) => {
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(image, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Tambahkan delimiter untuk menandai akhir pesan
            message += '\0';

            // Loop melalui setiap karakter dalam pesan
            for (let i = 0; i < message.length; i++) {
                const charCode = message.charCodeAt(i);
                const pixelIndex = i * 4;

                // Masukkan nilai karakter ke dalam kanal merah (R) piksel
                imageData.data[pixelIndex] = charCode;
            }

            ctx.putImageData(imageData, 0, 0);

            // Hasilkan data URL dari gambar di elemen canvas
            const dataURL = canvas.toDataURL('image/png');

            // Download Gambar
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'stegano_encoded_output.png';
            link.click();

        });
    }

    // Fungci untuk memperoleh pesan dalam gambar
    function extract(imagePath, callback) {
        loadImage(imagePath).then((image) => {
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(image, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let message = '';
            let charCode = 0;

            // Loop melalui setiap piksel dalam gambar
            for (let i = 0; i < imageData.data.length; i += 4) {
                charCode = imageData.data[i];

                // Jika nilai karakter adalah null (delimiter), berhenti
                if (charCode === 0) {
                    break;
                } else if (charCode <= 31 || charCode >= 127) {
                    if(charCode != 13){
                        break;
                    }
                }

                const char = String.fromCharCode(charCode);
                message += char;
            }
            callback(message)
        });
    }

    return {
        embed,
        extract,
    }
})()

export default stegano
