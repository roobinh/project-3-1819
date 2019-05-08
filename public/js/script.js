console.log("script.js loaded.")

var url = "http://cmd.jiskefet.io/api/runs";
var key = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjkwYmMyMjk0ZDk2MDBhZmEyN2IwZDlhOGZiYzI3NzliMmYxMDNiMGUiLCJpYXQiOjE1NTczMDk3MzQsImV4cCI6MTU1NzMxMzMzNH0.99EOjoeSUtn8Rc2B9IT8XxKQ5P2ZcBN8G6vJ9dSI2Tw";

httpGetRequest(url, key);

function httpGetRequest(url, key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader("Authorization", key);
    xmlHttp.send();
    console.log(xmlHttp.responseText);
}