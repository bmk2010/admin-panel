const Token = localStorage.getItem("Token");
const elWrapper = document.querySelector("#users-wrapper");

if (Token == null) {
  window.location.replace("./index.html");
}

setTimeout(() => {
  Toastify({
    text: "Admin panelga xush kelibsiz",
    backgroundColor: "green",
    position: "center",
  }).showToast();
}, 500);

let allUsers = [];
fetch("https://66e567fb5cc7f9b6273d3b2b.mockapi.io/api/profiles")
  .then((res) => res.json())
  .then((users) => {
    console.log(users);

    allUsers = users;
    renderUsers(users);
  });

const elTemplate = document.querySelector("#users");

const renderUsers = (list = allUsers) => {
  elWrapper.textContent = ""; // Wrapperni tozalash
  const fragment = document.createDocumentFragment();

  list.forEach((user) => {
    const newUser = elTemplate.content.cloneNode(true);

    // class orqali elementlarni tanlash
    const userName = newUser.querySelector(".user-name");
    const userPassword = newUser.querySelector(".user-password");
    const userToken = newUser.querySelector(".user-token");
    const userEmail = newUser.querySelector(".user-email");

    // Ma'lumotlarni to'ldirish
    userName.textContent = user.name;
    userPassword.textContent = user.password;
    userToken.textContent = user.token;
    userEmail.textContent = user.email;

    fragment.appendChild(newUser);
  });

  elWrapper.appendChild(fragment);
};
