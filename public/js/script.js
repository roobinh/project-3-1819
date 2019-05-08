console.log("script.js loaded.")

var url = "http://cmd.jiskefet.io/api/runs";
var key = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImE4ZDAyYmJiLTg3NjYtNDZhYS1iNDE3LWQyYzU3Zjk5ODE4YyIsImlzX3N1YnN5c3RlbSI6InRydWUiLCJwZXJtaXNzaW9uX2lkIjoiNCIsImlhdCI6MTU1NzMxNDAzNCwiZXhwIjoxNTg4ODUwMDM0fQ.G57X5Zdng33djii3S5pzWpu5q5GITX8DMsmJ4xOiNBc"

httpGetRequest(url, key);

function httpGetRequest(url, key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader("Authorization", key);
    xmlHttp.send();
    addRow(JSON.parse(xmlHttp.responseText));
}

function addRow(data) {
    console.log(data);

    const flpTable = document.getElementById("flptable").getElementsByTagName('tbody')[0];;

    for(var i = 1; i <= data.data.items.length; i++) {

        // Create new row at bottom of table
        const newRow = flpTable.insertRow(flpTable.rows.length);

        // Create Cell
        const cell1 = newRow.insertCell(0);

        // Create Text
        var text1  = document.createTextNode('New row');

        // Append Text to Cell
        cell1.appendChild(text1);
    }
}
