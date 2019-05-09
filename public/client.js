
(function () {
    // set variables
    var url = "http://cmd.jiskefet.io/api/runs?orderBy=runNumber&orderDirection=DESC";
    var key = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE4ZDAyYmJiLTg3NjYtNDZhYS1iNDE3LWQyYzU3Zjk5ODE4YyIsImlzX3N1YnN5c3RlbSI6InRydWUiLCJwZXJtaXNzaW9uX2lkIjoiNCIsImlhdCI6MTU1NzMxNDAzNCwiZXhwIjoxNTg4ODUwMDM0fQ.G57X5Zdng33djii3S5pzWpu5q5GITX8DMsmJ4xOiNBc"
    var oldData = "";

    // fill table on load
    checkForFileChange(url, key);

    // get request, checks if new file is same as previous file
    function checkForFileChange(url, key) {
        console.log("checking for file change");

        var xmlHttp = new XMLHttpRequest();
        // xmlHttp.open("GET", url, false);
        xmlHttp.open("GET", "/data/runs.json", false);
        xmlHttp.setRequestHeader("Authorization", key);
        xmlHttp.send();

        if(xmlHttp.responseText === oldData) {
            console.log("Same Data.")
        } else {
            console.log("Data Changed!")
            oldData = xmlHttp.responseText;
            fillTable(JSON.parse(xmlHttp.responseText));
            send();
        }
    }

    // fill table with data
    function fillTable(data) {

        // table
        const flpTable = document.getElementById("flptable").getElementsByTagName('tbody')[0];

        // clear Table
        for(var i = 0; i <flpTable.rows.length; i++) {
            flpTable.deleteRow(i -1);
        }

        // Fill up table
        for(var i = 0; i < data.data.items.length; i++) {
            // Create new row at bottom of table
            const newRow = flpTable.insertRow(flpTable.rows.length);

            // Create Cells
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            const cell5 = newRow.insertCell(4);
            const cell6 = newRow.insertCell(5);
            const cell7 = newRow.insertCell(6);
            const cell8 = newRow.insertCell(7);
            const cell9 = newRow.insertCell(8);
            const cell10 = newRow.insertCell(9);
            const cell11 = newRow.insertCell(10);
            const cell12 = newRow.insertCell(11);
            const cell13 = newRow.insertCell(12);
            const cell14 = newRow.insertCell(13);
            const cell15 = newRow.insertCell(14);

            // Create Texts
            var items = data.data.items;

            var text1 = document.createElement('a');
            var linktext = document.createTextNode(items[i]['runNumber']);
            text1.appendChild(linktext)
            text1.href = "http://cmd.jiskefet.io/runs/" + items[i]['runNumber']

            var itemstart1 = items[i]['O2StartTime'].split('T')
            var timestamp1 = itemstart1[0] +" "+ itemstart1[1].slice(0, 8)
            var text2  = document.createTextNode(timestamp1) // Time o2 start

            if(items[i]['O2EndTime'] == null) {
                var text3 = document.createTextNode("In Progress")// Time 02 end
            } else {
                var text3 = document.createTextNode(items[i]['O2EndTime']) 
            }
            
            var itemstart2 = items[i]['TrgStartTime'].split('T')
            var timestamp2 = itemstart2[0] + " "+ itemstart2[1].slice(0, 8);
            var text4  = document.createTextNode(timestamp2) // Time trg start

            if(items[i]['TrgEndTime']) {
                var text5  = document.createTextNode(items[i]['TrgEndTime']) // time trg end
            } else {
                var text5  = document.createTextNode("In Progress") // time trg end
            }

            var text6  = document.createTextNode(items[i]['activityId']) // activity id
            var text7  = document.createTextNode(items[i]['runType']) // run type 
            var text8  = document.createTextNode(items[i]['runQuality']) // run quality
            var text9  = document.createTextNode(items[i]['nDetectors'])  // detectors
            var text10  = document.createTextNode(items[i]['nFlps']) // flp's
            var text11  = document.createTextNode(items[i]['nEpns']) // epns
            var text12  = document.createTextNode(items[i]['nTimeFrames']) // timeframes
            var text13 = document.createTextNode(items[i]['nSubtimeFrames']) // sub-timeframes
            var text14 = document.createTextNode(items[i]['bytesReadout']) // B read out
            var text15  = document.createTextNode(items[i]['bytesTimeFrameBuilder']) // B timeframe builder

            // Append Text to Cells
            cell1.appendChild(text1);
            cell2.appendChild(text2);
            cell3.appendChild(text3);
            cell4.appendChild(text4);
            cell5.appendChild(text5);
            cell6.appendChild(text6);
            cell7.appendChild(text7);
            cell8.appendChild(text8);
            cell9.appendChild(text9);
            cell10.appendChild(text10);
            cell11.appendChild(text11);
            cell12.appendChild(text12);
            cell13.appendChild(text13);
            cell14.appendChild(text14);
            cell15.appendChild(text15);
        }
    }

    // check for file change every 10 seconds
    setInterval(function() {
        checkForFileChange(url, key);
    }, 10000);


    // ------------------- Service Worker -------------------------

    // set public vapid key
    const publicVapidKey = 'BDqsx1vZb0l1YgZra70RdNv42uK0gAf3_2TQh4ZPvFgOot_ep6KFwXJb-vZWBmoiFkSuh2SAh2r1FPEnyu-k9oQ'

    // register service worker
    async function registerWorker() {
        // check for service worker
        if('serviceWorker' in navigator) {
            send().catch(err => console.error(err));
        } else {
            console.log("Service worker not available in your current browser.")
        }
    }

    // send notification
    async function send() {
        console.log('Registering service worker...');
        const register = await navigator.serviceWorker.register('worker.js', {
            scope: '/'
        });
        console.log('Service worker registered.');
        
        console.log(register);

        var convertedPublicKey = urlBase64ToUint8Array(publicVapidKey);
        
        console.log("Register Push...");
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedPublicKey
        })
        console.log("Push registered.")

        console.log(subscription);
        
        console.log("Sending Notification")
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log("Push send!")
    }

    // function to convert vapid key
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }

    // disable service workers
    function disableWorker() {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister()
            } 
        })

        location.reload();
    }

    // check if service worker is running
    navigator.serviceWorker.getRegistrations().then(registrations => {
        if(registrations.length == 1) {
            console.log("sw running...")
        } else {
            registerWorker();
        }
    });

    
})();



