// sign up page

const signup_btn = document.querySelector(".signup_btn");

const no_username = document.querySelector(".no-username");

const no_password = document.querySelector(".no-password");

const account_success = document.querySelector(".account-success");

signup_btn.addEventListener("click", onclick);
function onclick(e) {
  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;

  var data = {};
  if (username !== "" && password !== "") {
    data = {
      user_name: username,
      pass_word: password,
      status: null,
      time: null,
    };

    localStorage.setItem("data", JSON.stringify(data));

    no_username.textContent = "";
    no_password.textContent = "";
    account_success.innerHTML = `  
    Your account has been created succesfully
       <br />
    <a
      class="text-dark text-decoration-none fs-6"
      href="/index.html"
      >Click here</a
    >
    to Login to your account
 
    `;
  } else {
    if (username === "") {
      no_username.textContent = "Please Enter Username First!";
    } else {
      no_username.textContent = "";
    }
    if (password === "") {
      no_password.textContent = "Please Enter Password First!";
    } else {
      no_password.textContent = "";
    }
  }
  e.preventDefault();
}
