//  function  for checking whether the user is still signed in or not by checking the status value
// stored in local storage
document.addEventListener("DOMContentLoaded", statuscheck);
function statuscheck() {
  data = JSON.parse(localStorage.getItem("data"));
  const now = new Date();
  const now2 = now.getTime();

  // if there is'nt any data object in local storage then data will be null so it will redirect the user to the
  // signup page so user would make  an account and then try to login again
  if (data === null) {
    location.href = "./signup.html";
  }
  // checking if the time token for the last login has been expired or not if expired you will be redireted
  //to the signup page and you have to create a new account which will again be valid for some time
  if (data.time < now2) {
    console.log("osama");
    localStorage.removeItem("data");
    location.href = "./signup.html";
  }
  // checeking that you can't open any page until you log in when you login then this data.status will get ok
  if (data.status === null) {
    location.href = "/index.html";
  }
  if (data.status != "ok") {
    location.href = "/index.html";
  }
}

// FOR getting username form session storage and displaying it at main dashboard
const dashboard_username = document.querySelector(".dashboard_username");
data = JSON.parse(localStorage.getItem("data"));
dashboard_username.innerHTML = `
  Welcome ${data.user_name}
  `;

// fetching drop list items
const dropdown_items = document.querySelectorAll(".dropdown-item");

//  fetching table element
const tbody = document.getElementById("table-body");

// fetching form
const form_template = document.querySelector(".form_template");

// fetching page title
const title = document.getElementById("title");

// fetching p element for displaying warning text
const warning_text = document.querySelector(".warning-text");

// fetching label element on modal for displaying the modal type
const label = document.getElementById("exampleModalLabel");

// fetching save button
const save_btn = document.getElementById("save");

// function for iterating through close buttons and then listen for close button to remove classes form modal elements
// fetching close buttons
const close = document.querySelectorAll("[data-bs-dismiss = modal]");

close.forEach((closing) => {
  closing.addEventListener("click", function () {
    label.classList.remove("label_text");
    warning_text.innerText = " ";
    warning_text.classList.remove("text-danger");
  });
});

// function for displaying warnings if the user is not on the specific page
function warnings() {
  let counts = 0;
  // warning when simply the modal is opened
  if (counts == 0) {
    warning_text.innerText =
      "You must have to be on same page in order to add data in table";
  }
  counts += 1;
  // warnings when save button is clicked 2 to 3 times on modal
  save_btn.addEventListener("click", function () {
    if (counts == 1) {
      warning_text.classList.add("text-danger");
    }
    if (counts == 2) {
      warning_text.innerText =
        "You must have to be on same page in order to add data in table and if you click save button again the modal will be closed automatically without appending data into table";
      save_btn.setAttribute("data-bs-dismiss", "modal");
    }

    if (counts == 3) {
      save_btn.removeAttribute("data-bs-dismiss");
      warning_text.classList.remove("text-danger");
    }
    counts += 1;
    if (counts == 4) {
      counts = 0;
    }
  });
}
// function for iterating through dropdown items
dropdown_items.forEach((dropdown_item) => {
  // event listner on dropdown item
  dropdown_item.addEventListener("click", modalOpening);
});

// Function for adding user data into html table row
function addingUser() {
  // save_btn attribute set to data-bs-dismiss here to close the modal automatically when
  // save button is pressed after inputing data
  save_btn.setAttribute("data-bs-dismiss", "modal");

  // listening for save button click to get data from form and appending into table row
  save_btn.addEventListener("click", savingFormadd);
}

// Function for adding posts and pages data into html table row element
function addingPageandPost() {
  save_btn.setAttribute("data-bs-dismiss", "modal");
  // listening for save button click to get data from form and appending into table row
  save_btn.addEventListener("click", savingForm);
}

// calling delete page function
deleting();

// All FUNCTIONS
// function for open modal
function modalOpening(e) {
  // if add page option is selected from dorp down list
  if (e.target.id == 1) {
    label.innerText = "Add Page";
    addPage();
  }
  // if add post option is selected from dorp down list
  if (e.target.id == 2) {
    label.innerText = "Add Post";
    addPost();
  }
  // if add user option is selected from dorp down list
  if (e.target.id == 3) {
    label.innerText = "Add User";
    addUser();
  }
  if (title.innerText === "Admin panel") {
    warnings();
  }
  if (title.innerText === "Posts") {
    if (e.target.id == 2) {
      warning_text.innerText = " ";
      label.classList.add("label_text");
      addingPageandPost();
    } else if (e.target.id == 1 || e.target.id == 3) {
      warnings();
    }
  }

  if (title.innerText === "Users") {
    if (e.target.id == 3) {
      warning_text.innerText = " ";
      label.classList.add("label_text");
      addingUser();
    } else if (e.target.id == 1 || e.target.id == 2) {
      warnings();
    }
  }

  if (title.innerText === "Pages") {
    if (e.target.id == 1) {
      warning_text.innerText = " ";
      label.classList.add("label_text");
      addingPageandPost();
    } else if (e.target.id == 3 || e.target.id == 2) {
      warnings();
    }
  }
}

// modal template for adding posts
function addPage() {
  form_template.innerHTML = `
  <div class="mb-3">
  <label
    for="exampleFormControlInput1"
    class="form-label fw-bold"
    >Page Title</label
  >
  <input
    type="text"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="About"
    value="About"
  />
</div>

<div class="mb-3">
  <label
    for="exampleFormControlTextarea1"
    class="form-label fw-bold"
    >Page Body</label
  >
  <textarea
    class="form-control"
    id="exampleFormControlTextarea1"
    rows="3"
    name="editor1"
  ></textarea>

  <div class="mb-3 mt-3">
    <input
      class="form-check-input"
      type="checkbox"
      value=""
      id="flexCheckChecked"
      checked
    />
    <label class="form-check-label" for="flexCheckChecked">
      Published
    </label>
  </div>

  <div class="mb-3 mt-3">
    <label
      for="exampleFormControlInput1"
      class="form-label fw-bold"
      >Meta Tags
    </label>
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Add Meta Tags"
      required
    />
  </div>

  <div class="mb-3 mt-3">
    <label
      for="exampleFormControlInput1"
      class="form-label fw-bold"
      >Meta Description
    </label>
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Add Meta Descriptions"
    />
  </div>
  `;
}

// modal template for adding page
function addPost() {
  form_template.innerHTML = `
  <div class="mb-3">
  <label
    for="exampleFormControlInput1"
    class="form-label fw-bold"
    >Post Title</label
  >
  <input
    type="text"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="About"
    value="About"
  />
</div>

<div class="mb-3">
  <label
    for="exampleFormControlTextarea1"
    class="form-label fw-bold"
    >Post Body</label
  >
  <textarea
    class="form-control"
    id="exampleFormControlTextarea1"
    rows="3"
    name="editor1"
  ></textarea>

  <div class="mb-3 mt-3">
    <input
      class="form-check-input"
      type="checkbox"
      value=""
      id="flexCheckChecked"
      checked
    />
    <label class="form-check-label" for="flexCheckChecked">
      Published
    </label>
  </div>

  <div class="mb-3 mt-3">
    <label
      for="exampleFormControlInput1"
      class="form-label fw-bold"
      >Meta Tags
    </label>
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Add Meta Tags"
      required
    />
  </div>

  <div class="mb-3 mt-3">
    <label
      for="exampleFormControlInput1"
      class="form-label fw-bold"
      >Meta Description
    </label>
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Add Meta Descriptions"
    />
  </div>
  `;
}
// FUNCTION modal template for adding user
function addUser() {
  form_template.innerHTML = `
  <div class="mb-3">
  <label
    for="exampleFormControlInput1"
    class="form-label fw-bold"
    >Name</label
  >
  <input
    type="text"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="hassan"
    value="hassan"
  />
</div>
<div class="mb-3 mt-3">
<label
  for="exampleFormControlInput1"
  class="form-label fw-bold"
  >Last name
</label>
<input
  type="text"
  class="form-control"
  id="exampleFormControlInput1"
  placeholder="hafeez"
  required
/>
</div>
<div class="mb-3 mt-3">
<label
  for="exampleFormControlInput1"
  class="form-label fw-bold"
  >ID
</label>
<input
  type="text"
  class="form-control"
  id="exampleFormControlInput1"
  placeholder="32214"
  required
/>
</div>
  <div class="mb-3 mt-3">
    <label
      for="exampleFormControlInput1"
      class="form-label fw-bold"
      >Email
    </label>
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="email"
      value = "hassanh321@gmail.com"
      required
    />
  </div>
  `;
}

// appending the add user modal data
function savingFormadd(e) {
  // checking for label text
  if (label.classList.contains("label_text")) {
    // getting name value form form
    const name = document.querySelector("input[placeholder = hassan]").value;
    console.log(name);
    // getting email value form form
    const email = document.querySelector("input[placeholder = email]").value;
    console.log(email);
    // getting date
    var date = new Date();
    date = `
    ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}
      `;

    // creating table row
    const ta = document.createElement("tr");

    // adding class to the table row
    ta.classList.add("delo");

    // writing template literal  to table row
    ta.innerHTML = `  
<td class="filter_item"> ${name}</td>
<td>${email}</td>
<td>${date}</td>
<td>
<a
type="button"
class="btn btn-outline-secondary btn-sm"
href="/html/editpage.html"
>
Edit
</a>
<button
type="button"
class="btn btn-primary btn-sm my-2 del"
>
Delete
</button>
</td>

`;
    // appending  table row to table body
    tbody.appendChild(ta);
    e.preventDefault();
    save_btn.removeAttribute("data-bs-dismiss");
    label.classList.remove("label_text");
    // calling delete function
    deleting();
  }
}

// appending add post and add page  modal data
function savingForm(e) {
  // checking for label text
  if (label.classList.contains("label_text")) {
    // getting title value form form
    const title = document.querySelector("input[placeholder = About]").value;

    // getting check status form form
    const check = document.querySelector("input[type = checkbox]");

    //  making variable based on check status
    var yes = "";
    if (check.attributes.checked) {
      yes = "no";
    } else {
      yes = "yes";
    }

    // getting date
    var date = new Date();
    date = `
    ${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}
      `;

    // creating table row
    const tr = document.createElement("tr");

    // adding class to the table row
    tr.classList.add("delo");

    // writing template literal  to table row
    tr.innerHTML = `  
<td class="filter_item">${title}</td>
<td>${yes}</td>
<td>${date}</td>
<td>
<a
type="button"
class="btn btn-outline-secondary btn-sm"
href="/html/editpage.html"
>
Edit
</a>
<button
type="button"
class="btn btn-primary btn-sm my-2 del"
>
Delete
</button>
</td>

`;
    // appending  table row to table body
    tbody.appendChild(tr);
    e.preventDefault();
    save_btn.removeAttribute("data-bs-dismiss");
    label.classList.remove("label_text");
    // calling delete function
    deleting();
  }
}

// delete page
function deleting() {
  const del = document.querySelectorAll(".del");
  del.forEach((el) => {
    el.addEventListener("click", onclickthree);
    function onclickthree(e) {
      if (e.target.parentElement.parentElement.classList == "delo") {
        e.target.parentElement.parentElement.remove();
      }
    }
  });
}
