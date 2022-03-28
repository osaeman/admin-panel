// Filtering items

const table_body = document.getElementById("table-body");
table_body.addEventListener("mouseover", naya);
console.log(table_body);
function naya() {
  console.log("osama");
  // obtaining filter input value
  const filter_input = document.querySelector("input[placeholder = filter]");
  // fetching tr
  const delo = document.querySelectorAll(".delo");

  filter_input.addEventListener("keyup", filtering);
  function filtering(e) {
    const value = e.target.value.toLowerCase();
    // function for matching the input value and values from table rows
    delo.forEach(function (task) {
      if (
        task.firstElementChild.textContent.toLowerCase().indexOf(value) != -1
      ) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  }
}
