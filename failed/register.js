(function() {

  // Initialize Firebase


  //Get elements
  const txtFirstName = document.getElementById('first');
  const txtLastName = document.getElementById('last');
  const txtEmail = document.getElementById('email');
  const passPassword = document.getElementById('password');
  const txtGrade = document.getElementById('grade');
  const btnRegister = document.getElementById('submitUser');
  const btnLogin = document.getElementById('loginUser');
  const btnLogout = document.getElementById('logout');
  //Add login event
  btnLogin.addEventListener('click', e=> {
    //get email and passPassword
    const email = txtEmail.value();
    const pass = passPassword.value();
    const auth = firebase.auth();

    //sign in

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  //add signup event
  btnRegister.addEventListener('click', e=> {
       const email = txtEmail.value();
       const pass = passPassword.value();
       const auth = firebase.auth();

       //sign in

       const promise = auth.createUserWithEmailAndPassword(email, password);
       promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click',e => {
    firebase.auth().signOut();
  });
    //add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser)
      {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
      } else {
        console.log('not logged in');
        btnLogout.classList.remove('hide');
      }
    });
}
