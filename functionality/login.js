// LOGIN PAGE

const login_btn = document.querySelector(".login_btn");

const invalid_credentials = document.querySelector(".invalid-credentials");

const now = new Date();

data = JSON.parse(localStorage.getItem("data"));

login_btn.addEventListener("click", onclicktwo);
function onclicktwo(e) {
  const password_login = document.querySelector(".password_login").value;
  const username_login = document.querySelector(".username_login").value;
  if (data === null) {
    invalid_credentials.textContent = "You must create account first";
    return;
  }

  if (password_login !== data.pass_word || username_login !== data.user_name) {
    invalid_credentials.textContent = "Invalid Username or Password";
  } else if (
    password_login === data.pass_word &&
    username_login === data.user_name
  ) {
    data.status = "ok";
    data.time = now.getTime() + 10000000;
    localStorage.setItem("data", JSON.stringify(data));
    invalid_credentials.textContent = "";
    location.href = "/html/dashboard.html";
  }
}
