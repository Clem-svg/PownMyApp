var userName = document.querySelector('input[name="userName"]')
var userPassWord = document.querySelector('input[name="userPassword"]')
var loginForm = document.getElementById('form')

window.onload = init()

function init() {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault()
        localStorage.setItem('myUserName', userName.value);
        window.location.replace = "welcome.html"
    })
}

