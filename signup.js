const signupBtn = document.querySelector('#signup-btn');
    signupBtn.addEventListener('click', e => {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            alert(`Your a/c has been created with E-mail ID: ${cred.user.email}`);
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            errorText.textContent = errorMessage;
        });
});