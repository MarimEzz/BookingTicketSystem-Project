// Sign/Log Animation
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".containerr");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Password Matched
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
//////////////////////////// Duplicated Code XXX(DELETE)

document.getElementById("sign-in-form").addEventListener("submit",function(e)
{
  e.preventDefault();
  const signinformdata = new FormData(this);
  //action attribute value /submit
  fetch("http://127.0.0.1:8000/api/login",{
    method: "POST",
    body:signinformdata
  }).then(response=>{
    if(!response.ok)
    {
      throw new Error("Network response was not ok")
    }
    return response.json();
  }).then(data=>{
    console.log("form submitted successfully:",data);
  }).catch(error=>{
    console.error("there was a problem with form submission:",error);
  });
});
///////////////////////////

document.getElementById("sign-up-form").addEventListener("submit",function(e)
{
  e.preventDefault();
  const signupformdata = new FormData(this);
  //action attribute value /submit
  fetch("http://127.0.0.1:8000/api/register",{
    method: "POST",
    body:signupformdata
  }).then(response=>{
    if(!response.ok)
    {
      throw new Error("Network response was not ok")
    }
    return response.json();
  }).then(data=>{
    console.log("form submitted successfully:",data);
  }).catch(error=>{
    console.error("there was a problem with form submission:",error);
  });
});
///////////////////////////

// Function to handle sign-in form submission
document.getElementById("sign-in-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const user_name = formData.get("user_name");
  const password = formData.get("password");

  try {
  //action attribute value "EndPoint" >>>> /login
      const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ user_name, password })
      });

      const data = await response.json();

      // Check if login was successful
      if (response.ok)
      {
          localStorage.setItem("token", data.token);
          window.location.href="Home/Home.html";
      } 
      else 
      {
        if (response.status === 401)
        { //if Invalid username or password.
          const signupMessageinv = document.getElementById("signin-message-invalid");
          signupMessageinv.style.display = "block";
          console.error("Registration failed:", data.message);
        }
        else
        { //if Other Erroe (server or network error)
          const signupMessagedanger = document.getElementById("signin-message-danger");
          signupMessagedanger.textContent = data.message;
          signupMessagedanger.style.display = "block";
          console.error("Registration failed:", data.message);
        }
      }
  } 
  catch (error) {
      console.error("Error during login:", error);
  }
});

// Function to handle sign-up form submission
document.getElementById("sign-up-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const user_name = formData.get("user_name");
  const name  = formData.get("name");
  const nid   = formData.get("nid");
  const email = formData.get("email");
  const university = formData.get("university");
  const phone = formData.get("phone");
  const password = formData.get("password");


  try {
  //action attribute value "EndPoint" >>>> /register
      const response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ user_name, name , nid , email, university, phone , password, })
      });

      const data = await response.json();
      // Check if registration was successful
      if (response.ok)
      {
        localStorage.setItem("token", data.token);
        window.location.href="Home/Home.html";
      }
      else if (response.status === 409)
      { // if User Already Exists (Created Account Before)
        const signupMessagewar = document.getElementById("signup-message-war");
        signupMessagewar.style.display = "block";
        console.error("Registration failed:", data.message);
      }
      else
      {
        // Handle failed registration (display error message, etc.)
        const signupMessagedang = document.getElementById("signup-message-dang");
        signupMessagedang.textContent = data.message;
        signupMessagedang.style.display = "block";
        console.error("Registration failed:", data.message);
      }
  } catch (error) {
      console.error("Error during registration:", error);
  }
}); 