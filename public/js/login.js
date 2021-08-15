const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#login_email').value.trim();
  const password = document.querySelector('#login_password').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dash');
    } else {
      alert(response.statusText);
    }
  }
};
  
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signupName').value.trim();
  const email = document.querySelector('#signupEmail').value.trim();
  const password = document.querySelector('#signupPassword').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dash');
    } else {
      alert(response.statusText);
    }
  }
};
console.log(document.getElementById("login-form"));

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', loginFormHandler);
}


  
if (document.getElementById('signup-form')) {
  document
  .getElementById('signup-form')
  .addEventListener('submit', signupFormHandler);
}
