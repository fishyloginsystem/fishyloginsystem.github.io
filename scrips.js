var valueOfClockIn = 0;
var valueOfClockOut = 0;
var ref = 0;
var name = " ";
var clockIn = " ";
var clockOut = " ";
var buttonIn = 0;
var buttonOut = 0;
var buttonSubmit = 0;

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
    if(valueOfClockOut==null&&valeuOfClockIn==null)
    {
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('submit').disabled = false;
      buttonSubmit.onclick = pushDataToDatabase();
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
            var data = {
                name: user.displayName,
                clockIn: valueOfClockIn,
                clockOut: valueOfClockOut
            }
            ref.push(data);
            console.log(valueOfClockIn);
        } else {
            currentUid2 = null;
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
    return h+":"+m+":"+s;
}

function checkTime(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function buttonPushedForClockInTime() {
    valueOfClockIn = getTime();
    document.getElementById('out').disabled = false;
    console.log("in");
    return valueOfClockIn;
}

function buttonPushedForClockOutTime() {
    valueOfClockOut = getTime();
    if(valueOfClockIn = null)
    {
      document.getElementById('in').disabled = true;
    }
    console.log("out");
    return valueOfClockOut;
}
