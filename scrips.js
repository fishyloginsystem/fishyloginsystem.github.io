var buttonIn = document.getElementById('in');
var buttonOut = document.getElementById('out');
var buttonSubmit = document.getElementById('submit');

buttonIn.onClick = buttonPushedForClockInTime();
buttonOut.onClick = buttonPushedForClockOutTime();
buttonSubmit.onClick = pushDataToDatabase();

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
    basicInfoFunction();
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
    firebase.initializeApp(config);

    var database = firebase.database();
    var ref = database.ref('clockedData');
}

function pushDataToDatabase() {
    var data = {
        name: user.displayName,
        clockIn: valueOfClockIn;
        clockOut: valueOfClockOut;
    }

    function getTime() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
        setTimeout("getTime()", 1000);
    }

    function checkTime(time) {
        if (time < 10) {
            time = "0" + time;
        }
        return time;
    }

    function buttonPushedForClockInTime() {
        var valueOfClockIn = getTime();
    }

    function buttonPushedForClockOutTime() {
        var valueOfClockOut = getTime();
    }
