const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInp = loginForm.name;
  const emailInp = loginForm.email;
  const password = loginForm.password;

  if (nameInp.value !== "" && emailInp.value !== "" && password.value !== "") {
    const Token = localStorage.getItem("Token");
    if (Token == null) {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: nameInp.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token){
            localStorage.setItem("Token", JSON.stringify(data.token));

            fetch("https://66e567fb5cc7f9b6273d3b2b.mockapi.io/api/profiles", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                name: nameInp.value,
                email: emailInp.value,
                password: password.value,
                token: data.token,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                window.location.replace("./admin.html");
              });
          }
          else{
            Toastify({text: "login yoki parol xato terildi", backgroundColor: "red", position: "center"})
          }
        });
    } else {
      window.location.replace("./admin.html");
    }
  } else {
    Toastify({
      text: "Hamma maydonchaga qiymat kiriting",
      duration: 3000,
      position: "center",
      backgroundColor: "red",
    }).showToast();
  }
});
