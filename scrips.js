function basicInfoFunction()
{
  var currentUid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.uid != currentUid) {
      currentUid = user.uid;
      document.getElementById("basicInfo").innerHTML = 'Full Name: ' + user.displayName + '<br> Email: ' + user.email + '<br>';
    } else {
      currentUid = null;
      console.log("no user signed in");
    }
  });
}
window.addEventListener("load", function() {
    basicInfoFunction();
});
