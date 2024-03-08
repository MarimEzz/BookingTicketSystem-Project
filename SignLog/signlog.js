const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


const pass = document.getElementById("pass");
const match = document.getElementById("match");
document.addEventListener('keydown', function(event) {

if(pass.value!=match.value)
{
    document.getElementById("matched").style.display="block";
}
else
{
    document.getElementById("matched").style.display="none";
}
})

var signinform = document.getElementById("sign-in-form");
var signupform = document.getElementById("sign-up-form");

document.getElementById("btnin").addEventListener("click", function () {
    signinform.submit();
});
document.getElementById("btnup").addEventListener("click", function () {
    signupform.submit();
  });