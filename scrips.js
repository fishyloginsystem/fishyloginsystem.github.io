var valueOfClockIn;
var valueOfClockOut;

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
    var buttonIn = document.getElementById('in');
    var buttonOut = document.getElementById('out');
    var buttonSubmit = document.getElementById('submit');

    buttonIn.onclick = buttonPushedForClockInTime();
    buttonOut.onclick = buttonPushedForClockOutTime();
    buttonSubmit.onclick = pushDataToDatabase();
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
    var ref = secondaryDatabase.ref('clockedData');
}

function pushDataToDatabase() {
    firebase.auth().onAuthStateChanged(function(user) {
            if (user && user.uid != currentUid) {
                currentUid = user.uid;
                var data = {
                    name: user.displayName,
                    clockIn: valueOfClockIn,
                    clockOut: valueOfClockOut
                }
            } else {
                currentUid = null;
                console.log("no user signed in");
            }
        });
    }

    function getTime() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        return h + ":" + m + ":" + s;
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
