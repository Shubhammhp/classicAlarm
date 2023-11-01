window.onload = function() {
    // Function to update the time displayed
    function updateTime() {
        // Get the current date and time
        var now = new Date();
        // Define options for formatting the time
        var options = { 
            hour: 'numeric', // Display hours
            minute: 'numeric', // Display minutes
            second: 'numeric', // Display seconds
            hour12: true // Use 12-hour format (true) or 24-hour format (false)
        };
        // Format the current time using the specified options
        var timeString = now.toLocaleTimeString('en-US', options);
        // Update the HTML element with the formatted time
        document.getElementById('clock').innerHTML = timeString;
    }
    // Function to update the date displayed
    function updateDate() {
        // Get the current date and time
        var now = new Date();
        // Define options for formatting the date
        var options = { 
            year: 'numeric', // Display the year
            month: 'long',   // Display the full month name
            day: 'numeric'   // Display the day of the month
        };
        // Format the current date using the specified options
        var dateString = now.toLocaleDateString('en-US', options);
        // Update the HTML element with the formatted date
        document.getElementById('date').innerHTML = dateString;
    }
    
    // Initial call to update time and date
    updateTime();
    updateDate();
    // Set intervals to update time and date every second
    setInterval(updateTime, 1000);
    setInterval(updateDate, 1000);
    

}


var alarms = [];  // Array to store alarms

function setAlarm() {
    // Check if the maximum number of alarms (8) has been reached
    if(alarms.length>=8){
        alert("You Can Only Set Up To 8 alarms");
        return;
    }

    // Get the selected hour, minutes, and AM/PM from the input elements
    var alarmHour = document.getElementById("hours").value;
    var alarmMinutes = document.getElementById("minutes").value;
    var alarmMode = document.getElementById("AM/PM").value;

    // Validate the selected values
    if(alarmHour=="Select hour"){
        alert("Enter Hour");
        return;
    } else if(alarmMinutes == "Select Minutes"){
        alert("Enter Minutes");
        return;
    } else if(alarmMode =="Select AM/PM"){
        alert("Enter AM/PM");
        return;
    } else {

        // time string in the format HH:MM AM/PM
        var time = alarmHour+":"+alarmMinutes+" "+alarmMode;
        // Checking if the alarm time already exists in the alarms array
        if(alarms.includes(time)){
        alert("Alarm Already Exist");
        return;
        }
        // Add the new alarm time to the alarms array
        alarms.push(time);
        // Updating the displayed list of alarms
        displayAlarms();
    }
}

function deleteAlarm(index) {
    // Removing the alarm at the specified index from the alarms array
    alarms.splice(index, 1);
    // Updating the displayed list of alarms
    displayAlarms();
}

function displayAlarms() {
    var alarmListDisplay = document.getElementById("alarm-list");
    // Clearing any existing content inside the "alarm-list" element
    alarmListDisplay.innerHTML = "";

    // Loop through each alarm in the alarms arrayvscode
    
    alarms.forEach(function(alarm, index) {
        // Creation of a new div element to display the alarm
        var alarmDisplay = document.createElement("div");

        // Creating a delete button element
        var deleteButton = document.createElement("button");
        // Setting the text content of the delete button to "DEL"
        deleteButton.textContent = "DEL";

        // Applying styles to the delete button
        deleteButton.style.alignItems = "center";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.fontFamily = "Arial, sans-serif"; 
        deleteButton.style.textAlign="center";
        deleteButton.style.borderRadius="10%";
        deleteButton.style.marginTop="8px";
        deleteButton.style.background="transparent";
        deleteButton.style.backgroundColor="white";
        // Setting an event handler for the delete button
        deleteButton.onclick = function() {
            // When clicked, call the deleteAlarm function with the current index
            deleteAlarm(index);
        };
        // Setting the text content of the alarm display element
        alarmDisplay.textContent = "Alarm " + (index + 1) + ": " + alarm;
        // Appending the delete button to the alarm display element
        alarmDisplay.appendChild(deleteButton);
        // Appending the alarm display element to the "alarm-list" element
        alarmListDisplay.appendChild(alarmDisplay);
    });
}
// Retrieving the element with ID "alarm-display-box"
var alarmDisplayBox = document.getElementById("alarm-display-box");
// Setting the display property to "block" to make it visible
alarmDisplayBox.style.display = "block";
// Setting padding to 5 pixels
alarmDisplayBox.style.padding= "5px";
// Setting font weight to 700 for bold text
alarmDisplayBox.style.fontWeight= "700";


function checkAlarms() {
    // Getting current date and time
    var now = new Date();
    // Extracting current hour, minute, and AM/PM
    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();
    var currentMode = (currentHour >= 12) ? "PM" : "AM";

    // Formatting the current time in HH:MM AM/PM format
    var currentTimeString = currentHour + ":" + currentMinute + " " + currentMode;

    // Check if the current time matches any of the set alarms
    alarms.forEach(function(alarm, index) {
        if (alarm === currentTimeString) {
            var confirmed = window.confirm("Time to wake up!");
            if (confirmed) {
                // Removing the triggered alarm from the alarms array
                alarms.splice(index, 1);
                displayAlarms(); // Updating the displayed list of alarms
            }
        }
    });
}

setInterval(checkAlarms, 1000);