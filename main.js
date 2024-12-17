'use strict'

window.addEventListener('load', () => {
    var urlQr = this.document.querySelector('#urlQr');
    var imgBox = this.document.querySelector('#imgBox');
    var generateQr = this.document.querySelector('#generateQr');
    var qrImage = this.document.querySelector('#qrImage');
    var errorContainer = this.document.querySelector('.error')

    generateQr.addEventListener('click', () => {
        if(urlQr.value.length > 0){
            qrImage.src = 'https://api.qrserver.com/v1/create-qr-code/?size=700x700&data=' + urlQr.value;
            urlQr.value = '';

            imgBox.classList.add('show-img');
        }else{
            var errorMsg = document.createElement('div');
            errorContainer.append(errorMsg);
            errorMsg.classList.add('error-msg');
            errorMsg.innerHTML = '<span>Error: </span>La URL debe ser obligatoria'
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        }
    });

    async function downloadImage(url, filename) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error al descargar la imagen:', error);
        }
    }

    qrImage.addEventListener('click',() => {
        downloadImage(qrImage.src, 'QR Code Generated.png')
    });

});