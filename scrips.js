var valueOfClockIn = 0;
var valueOfClockOut = 0;
var ref = 0;
var buttonIn = 0;
var buttonOut = 0;
var buttonSubmit = 0;
var unix;
var readableDate;
var clockOutString;
var clockInString;
var uncTotal;
var totalTimeInRoom;

function basicInfoFunction() {
    var currentUid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.uid != currentUid) {
            currentUid = user.uid;
            document.getElementById("basicInfo").innerHTML = '<strong><font size="5"> Full Name: </strong>' + user.displayName + '<br> <strong>Email: </strong>' + user.email + '<br></font>';
        } else {
            currentUid = null;
            console.log("no user signed in");
        }
    });
}
window.addEventListener("load", function() {
    loadFirebase();
    basicInfoFunction();
    buttonIn = document.getElementById('in');
    buttonOut = document.getElementById('out');
    buttonSubmit = document.getElementById('submit');

    buttonIn.onclick = buttonPushedForClockInTime;
    buttonOut.onclick = buttonPushedForClockOutTime;
    if (valueOfClockOut == null && valeuOfClockIn == null) {
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
        buttonSubmit.onclick = pushDataToDatabase;
    }
});

function loadFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDrBcG17k4_2rZyyU7NuhXRITDuOcMj_eA",
        authDomain: "fishylogin-6cdac.firebaseapp.com",
        databaseURL: "https://fishylogin-6cdac.firebaseio.com",
        projectId: "fishylogin-6cdac",
        storageBucket: "fishylogin-6cdac.appspot.com",
        messagingSenderId: "463408364435"
    };
    var secondaryAppConfig = {
        apiKey: "AIzaSyAjiFR2ZZTtSKYCbW7hjbuClkLDYE6gsN4",
        authDomain: "fishytime-4426f.firebaseapp.com",
        databaseURL: "https://fishytime-4426f.firebaseio.com",
        storageBucket: "",
    };
    firebase.initializeApp(config);
    var secondary = firebase.initializeApp(secondaryAppConfig, "secondary");
    var secondaryDatabase = secondary.database();
    ref = secondaryDatabase.ref('clockedData');
    clockIn = 0;
    clockOut = 0;
    name = "blank";
}

function pushDataToDatabase() {
    var currentUid2 = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.uid != currentUid2) {
            currentUid2 = user.uid;
            uncTotal = valueOfClockOut - valueOfClockIn;
            totalTimeInRoom = msToTime(uncTotal);
            var data = {
                name: user.displayName,
                clockIn: clockInString,
                clockOut: clockOutString,
                totalTime: totalTimeInRoom
            }
            ref.push(data);
            console.log(data.clockIn);
        } else {
            currentUid2 = null;
            console.log("no user signed in");
        }
    });
}

function getTime() {
    unix = Date.now();
    return unix;
}

function buttonPushedForClockInTime() {
    valueOfClockIn = getTime();
    clockInString = toReadableDate(getTime());
    console.log("in");
    return clockInString;
}


function buttonPushedForClockOutTime() {
    valueOfClockOut = getTime();
    clockOutString = toReadableDate(getTime());
    console.log("out");
    return clockOutString;
}

function toReadableDate(dateInMilliseconds)
{
    readableDate = new Date(dateInMilliseconds).toUTCString();
    return readableDate;
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}
