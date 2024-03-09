const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// password matched
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
////////////////

// Function to handle sign-in form submission
document.getElementById("sign-in-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const username = formData.get("username");
  const password = formData.get("password");

  try {
        //Endpoints here
      const response = await fetch("login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      // Check if login was successful
      if (response.ok) {
          localStorage.setItem("token", data.token);
          window.location.href="../index.html";
      } else {
          // Handle failed login (display error message, etc.)
          console.error("Login failed:", data.message);
      }
  } catch (error) {
      console.error("Error during login:", error);
  }
});

// Function to handle sign-up form submission
document.getElementById("sign-up-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    //Endpoints here
      const response = await fetch("/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      // Check if registration was successful
      if (response.ok) {
          localStorage.setItem("token", data.token);
          window.location.href="../index.html";
        } else {
          // Handle failed registration (display error message, etc.)
          console.error("Registration failed:", data.message);
      }
  } catch (error) {
      console.error("Error during registration:", error);
  }
});