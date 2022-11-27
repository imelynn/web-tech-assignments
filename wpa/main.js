//install service working immediately
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/service-worker.js', {scope: './'})
    .then(function(registration){
        console.log("Service Worker Registered, registration");
    })
    .catch(function(err) {
        console.log("Service Worker Failed to Register", err);
    })
}

// Register the service worker

/*window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('/public/servwork.js')
    .then(_ => console.log('Registered service worker'))
    .catch(e => console.log('Error registering: ',e));
  });*/
