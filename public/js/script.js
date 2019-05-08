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
    console.log(data.data.items)

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

        var text1  = document.createTextNode(items[i]['runNumber']) // Row Number
        var text2  = document.createTextNode(items[i]['O2StartTime']) // Time o2 start
        var text3  = document.createTextNode(items[i]['O2EndTime']) // Time 02 end
        var text4  = document.createTextNode(items[i]['TrgStartTime']) // Time trg start
        var text5  = document.createTextNode(items[i]['TrgEndTime']) // time trg end
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
