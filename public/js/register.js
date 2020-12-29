const validScreen = document.getElementById("validScreen");
const usersdata = document.getElementById("user").innerHTML;
const username = document.getElementById("username");
const form = document.getElementsByTagName("form")[0];
let validUserName = false;
let users = JSON.parse(usersdata);

console.log(users);

form.onsubmit = (e) => {
  if (!validUserName) {
    e.preventDefault();
  }
};

username.addEventListener("change", () => {
  for (let user of users) {
    if (username.value == user) {
      validUserName = false;
      validScreen.innerHTML = `<span style="color: red;">user Name is Not Available</sapn>`;
    } else {
      validUserName = true;
      validScreen.innerHTML = `<span style="color: green;">valid user Name</sapn>`;
    }
  }
});
