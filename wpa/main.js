//install service working immediately
/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}*/

// Register the service worker

window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('/public/servwork.js')
    .then(_ => console.log('Registered service worker'))
    .catch(e => console.log('Error registering: ',e));
  });
