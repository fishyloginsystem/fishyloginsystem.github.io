function basicInfoFunction()
{
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
