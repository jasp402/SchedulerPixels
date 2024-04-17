// sw.js

self.addEventListener('install', event => {
    console.log('Service Worker instalado');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activado');
});

self.addEventListener('fetch', event => {
    // Aquí puedes agregar la lógica para mantener el contador de reloj en funcionamiento
    // Puedes realizar acciones como actualizar el contador en segundo plano o mantenerlo sincronizado con el servidor
    // Por ejemplo, podrías enviar una solicitud periódica al servidor para obtener la hora actual y actualizar el contador en consecuencia
});

self.addEventListener('message', event => {
    const { elementId, options, time  } = event.data;
    let timeLeft = time;
    if( timeLeft > 0){
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                timeLeft = 0;
                clearInterval(countdownInterval);
            }
            self.postMessage({ elementId, options,  time: timeLeft });
        }, 1000); // Actualiza cada segundo
    }
});