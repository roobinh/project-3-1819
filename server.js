//server.js ('npm start')
const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const fs = require('fs');

const app = express()
const port = process.env.PORT || 2500

var server = app.listen(port, () => console.log(`App running, listening on port ${port}!`))

var io = socket(server);

io.on('connection', function(socket) {
    console.log(socket.id);
})

// set the view engine to ejs
app.set('view engine', 'ejs');

// set default directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// set vapid keys for service worker
const publicVapidKey = 'BDqsx1vZb0l1YgZra70RdNv42uK0gAf3_2TQh4ZPvFgOot_ep6KFwXJb-vZWBmoiFkSuh2SAh2r1FPEnyu-k9oQ'
const privateVapidKey = "hjIr54bMs_9Xw01Q2h5ci_jTU3yEjQa86h2Fk7MYkCc"
webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// index page 
app.get('/', function(req, res) {
    res.render('pages/home');
});

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');
});

app.get('/offline', function(req, res) {
    res.render('pages/offline')
})

app.get('/flp', function(req, res) {
    res.render('pages/flp')
})

app.post('/subscribe', (req, res) => {
    // debug
    console.log("sending push...")

    // get push subscription Object
    const subscription = req.body;

    console.log(subscription)

    // send 201 - resource created
    res.status(201).json({});

    // create payload
    const payload = JSON.stringify({ title: "CERN", body: "Hallo?!"})

    // pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.log(err))
})

const filePath = "public/data/runs.json";

fs.watch(filePath, function(eventName, filename) {
    if(filename) {
        console.log(filename + 'changed')

        var data = fs.readFileSync(filePath);
        let json = JSON.parse(data);
        io.emit('newRun', {title: "data changed"})
    }
})









