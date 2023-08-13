async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value;
    const password = document.querySelector('#password-login').value;

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    };
};
document.addEventListener('DOMContentLoaded', () => {
    // Call the loginFormHandler function after the DOM has loaded
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', loginFormHandler);
    });