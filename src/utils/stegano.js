import { createCanvas, loadImage } from 'canvas'


// const stegano = (() => {

//     // Fungsi untuk menyisipkan pesan dalam gambar
//     function embed(imagePath, message) {
//         loadImage(imagePath).then((image) => {
//             const canvas = createCanvas(image.width, image.height);
//             const ctx = canvas.getContext('2d', { willReadFrequently: true });
//             ctx.drawImage(image, 0, 0);

//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//             // Tambahkan delimiter untuk menandai akhir pesan
//             message += '\0';

//             // Loop melalui setiap karakter dalam pesan
//             for (let i = 0; i < message.length; i++) {
//                 const charCode = message.charCodeAt(i);
//                 console.log(charCode)
//                 const pixelIndex = i * 4;

//                 // Masukkan nilai karakter ke dalam kanal merah (R) piksel
//                 imageData.data[pixelIndex] = charCode;
//             }

//             ctx.putImageData(imageData, 0, 0);

//             // Hasilkan data URL dari gambar di elemen canvas
//             const dataURL = canvas.toDataURL('image/png');

//             // Download Gambar
//             const link = document.createElement('a');
//             link.href = dataURL;
//             link.download = 'stegano_encoded_output.png';
//             link.click();

//         });
//     }

//     // Fungci untuk memperoleh pesan dalam gambar
//     function extract(imagePath, callback) {
//         loadImage(imagePath).then((image) => {
//             const canvas = createCanvas(image.width, image.height);
//             const ctx = canvas.getContext('2d', { willReadFrequently: true });
//             ctx.drawImage(image, 0, 0);

//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             let message = '';
//             let charCode = 0;

//             // Loop melalui setiap piksel dalam gambar
//             for (let i = 0; i < imageData.data.length; i += 4) {
//                 charCode = imageData.data[i];

//                 // Jika nilai karakter adalah null (delimiter), berhenti
//                 if (charCode === 0 || (charCode <= 31 && charCode !== 10) || charCode >= 127) {
//                     break;
//                 }

//                 const char = String.fromCharCode(charCode);
//                 message += char;
//             }
//             callback(message)
//         });
//     }

//     return {
//         embed,
//         extract,
//     }
// })()

const stegano = (() => {

    // Fungsi untuk menyisipkan pesan dalam gambar
    function embed(imagePath, message) {
        loadImage(imagePath).then((image) => {
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(image, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const hiddenMessage = '{' + message + '}'

            // Konversi pesan ke dalam biner, dan menambahkan delimiter
            const binaryMessage = messageToBinary(hiddenMessage)

            let binaryIndex = 0;

            // Loop melalui setiap piksel
            for (let i = 0; i < imageData.data.length; i++) {
                if (binaryIndex >= binaryMessage.length) {
                    break; // Pesan telah disisipkan semua
                }

                // Ambil bit dari pesan biner
                const bit = binaryMessage[binaryIndex];

                // Sisipkan bit ke dalam kanal warna LSB
                imageData.data[i] = setLSB(imageData.data[i], bit);

                binaryIndex++;
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
            let binaryMessage = '';

            for (let i = 0; i < imageData.data.length; i++) {
                // Ambil LSB (Least Significant Bit) dari setiap kanal warna
                const bit = (imageData.data[i] & 1).toString();
                binaryMessage += bit;

                // Cek apakah pesan telah selesai (delimiter ditemukan)
                if (i === 7 && binaryMessage !== messageToBinary('{')) {
                    binaryMessage = messageToBinary('Content Not Found')
                    break
                } else if (binaryMessage.slice(-8) === messageToBinary('}')) {
                    binaryMessage = binaryMessage.slice(8, -8); // Hapus delimiter
                    break;
                }
            }

            const message = binaryToMessage(binaryMessage);

            callback(message)
        });
    }

    return {
        embed,
        extract,
    }
})()

function messageToBinary(message) {
    let binaryMessage = '';
    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        binaryMessage += charCode.toString(2).padStart(8, '0');
    }
    return binaryMessage;
}

function setLSB(value, bit) {
    if (bit === '1') {
        return value | 1; // Set LSB to 1
    } else {
        return value & 254; // Set LSB to 0
    }
}

function binaryToMessage(binaryMessage) {
    let message = '';
    for (let i = 0; i < binaryMessage.length; i += 8) {
        const byte = binaryMessage.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        message += String.fromCharCode(charCode);
    }
    return message;
}

export default stegano
