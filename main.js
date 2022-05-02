let calendarDate = new Date();
let eventArray = [];

//Create a table
let rows = window.prompt("Input number of rows");
let cols = window.prompt("Input number of columns");

let table = document.createElement("table");
let tableDiv = document.getElementById("tableDiv");

for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    eventArray[i] = [];
    for (let j = 0; j < cols; j++) {
        let td = document.createElement("td");
        eventArray[i][j] = [];
        let div = document.createElement("div");
        div.setAttribute("id", ("d-" + i + "-" + j));
        div.innerHTML = calendarDate.toDateString();

        let br = document.createElement("br");

        //Add event links
        let addEvent = document.createElement("a");
        addEvent.setAttribute("id", ("a-" + i + "-" + j));
        addEvent.setAttribute("href", "#");
        addEvent.onclick = addEvents;
        addEvent.innerHTML = "Add Event";

        div.appendChild(br);
        div.appendChild(addEvent);
        let divider = document.createTextNode(" | ");
        div.appendChild(divider);

        let viewEvent = document.createElement("a");
        viewEvent.setAttribute("id", ("a-" + i + "-" + j));
        viewEvent.setAttribute("href", "#");
        viewEvent.onclick = viewEvents;
        viewEvent.innerHTML = "View Events";

        div.appendChild(viewEvent);
        td.appendChild(div);
        
        tr.appendChild(td);
        calendarDate.setDate(calendarDate.getDate() +1);
    }
    table.appendChild(tr);
}

tableDiv.appendChild(table);
table.setAttribute("border", 1);

function valueObj(userEvent, userDescription) {
    this.event = userEvent;
    this.description = userDescription;

    this.showEvent = function(){console.log(this.event);};
    this.showDes = showDescription;
}

function showDescription() {
    console.log("This event's description is " + this.description);
}

function addEvents(e) {
    let eventInput = prompt("Enter the event name");
    let eventDescription = prompt("Enter the event's description");

    //let eventObj = {event: eventInput, category: eventCategory};

    let eventObj  = new valueObj(eventInput, eventDescription);

    let idArr =  getValueFromID(e);
    let row = +idArr[1];
    let cell = +idArr[2];

    (eventArray[row][cell]).push(eventObj);
    console.log(eventArray);
}

function viewEvents(e) {
    let idArr = getValueFromID(e);

    let row = +idArr[1];
    let cell = +idArr[2];

    for (let x in eventArray[row][cell]) {
        (eventArray[row][cell][x]).showEvent();
        (eventArray[row][cell][x]).showDes();

        //Displaying all added events and their following description
        let viewEventsDiv = document.getElementById("viewEventsDiv");
        let allEvents = document.createElement("div");
        allEvents.setAttribute("id", "eventDiv");
        allEvents.innerText = ('Event Name: ' + ((eventArray[row][cell][x]).event) + '\nDescription: ' + ((eventArray[row][cell][x]).description));
        allEvents.style.display = "inline-block";

        viewEventsDiv.appendChild(allEvents);
        console.log((eventArray[row][cell][x]).event); 
        //this line of code displays all the events added
    }
}

function getValueFromID(e) {
    let addEvents = e.srcElement;
    let idArr = addEvents.id.split("-");
    console.log(idArr);

    return idArr;
}


