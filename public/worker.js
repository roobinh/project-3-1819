console.log("Service Worker loaded.")

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data);
    console.log("Push recieved.")
    self.registration.showNotification(data.title, {
        body: "Nieuwe Scan",
        icon: './img/cern.ico'
    })
})

