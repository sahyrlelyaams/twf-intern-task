const signIn = document.querySelectorAll('.sign-in'),
 loggedIn = document.querySelectorAll('.logged-in'),
 loggedOut = document.querySelector('.logged-out');

const userInfoPara = document.querySelector('#user-info');

const loginBtn = document.querySelector('#signin-btn'),
 submitBtn = document.querySelector('#submit-btn'),
 logoutBtn = document.querySelector('#logout-btn');
loginBtn.addEventListener('click', e => {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const heading = document.querySelector('#heading');
  const errorText = document.querySelector('#auth-error');
  
  // const userInfo = signIn(email, password);
  auth.signInWithEmailAndPassword(email, password)
    .then(userCred => {
      const userMetadata = userCred.user.metadata;
      if(userMetadata.a === userMetadata.b){
        heading.textContent = `First Time,${userCred.user.email}?`;

        signIn.forEach(ele => {
          ele.style.visibility = "collapse";
        });
        loggedIn.forEach(ele => {
          ele.style.visibility = "visible";
        });

        submitBtn.addEventListener('click', (e) => {
          e.preventDefault();

          const birthPlaceString = document.querySelector('input[name="place"]'),
          ageInput = document.querySelector('input[name="age"]');
          let userUid = auth.currentUser.uid;
          console.log('XXXXXXX::'+userUid);
          db.collection('userData').doc(userUid).set({
            birthPlace: birthPlaceString.value,
            currentAge: Number.parseInt(ageInput.value, 10)          
          });
          heading.textContent = 'Refresh For Login!!';
        });
      }
      else{
        heading.textContent = `Welcome,${userCred.user.email}`;
        db.collection('userData').doc(userCred.user.uid).get()
        .then(doc => {
          if(doc.exists) {
            userInfoPara.textContent = `Your Information reads : Born in ${doc.data().birthPlace}, ${doc.data().currentAge} year(s) ago...`;
          }
        })
        .catch(err => {
          console.log("Error!! : ", err);          
        });

        signIn.forEach(ele => {
          ele.style.visibility = "collapse";
        });
        userInfoPara.style.visibility = "visible";
      }
      var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve('Success!!');
        }, 2000);
      });
      promise
      .then(() => {loggedOut.style.visibility = "visible";})
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        errorText.textContent = "Wrong Password";
      } else {
        errorText.textContent = errorMessage;
      }
      console.log(error);
    });
});

logoutBtn.addEventListener('click', evt => {
  evt.preventDefault();

  auth.signOut()
  .then(() => {
    heading.textContent = 'Logged Out! Refresh for Login';
    userInfoPara.style.visibility = "collapse";
  })
  .catch(err => {
    console.log(err);
  });
})
