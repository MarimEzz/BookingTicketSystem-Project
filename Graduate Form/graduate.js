//invalid message of inputs

var ex = document.getElementById("extra");
ex.setCustomValidity("Maximum 3 only.");
  ex.addEventListener("input", function() {
    ex.setCustomValidity("");
  });
/////////////////////////////////////////////////

const inputx = document.getElementById("extra");
const xprice = document.getElementById("extraprice");
const fprice = document.getElementById("freeprice");
const total = document.getElementById("total");
var poptotal = document.getElementById("ft");
const vodcash = document.getElementById("vod-cash");
const etiscash = document.getElementById("etis-cash");
const freenum = document.getElementById("free");
const image = document.getElementById("imggraduateform");
const path="http://127.0.0.1:8000/images/";


var event_id=0;


var graduData = [];
var getgradu =new XMLHttpRequest();
//Here to put API GET for Graduates data
getgradu.open("GET","http://127.0.0.1:8000/api/grad");// <<<<<<<<<<<<<<<<<<<<<<<<<<<
getgradu.send();
getgradu.addEventListener("readystatechange", function(){
  if(getgradu.readyState == 4 && getgradu.status == 200)
  {
    //console.log(getgradu.response); //as string
    //graduData =JSON.parse(getgradu.response).category;  //category:[{,,,}]
    graduData =JSON.parse(getgradu.response); 
    console.log(graduData); //as Array
      xprice.value = graduData[graduData.length - 1].extra_price; //<<<<<<<
      fprice.value = graduData[graduData.length - 1].ticket_price; //<<<<<<<<
      freenum.value = graduData[graduData.length - 1].free_guests;
      event_id=graduData[graduData.length -1].id ;
      image.src = path+ graduData[graduData.length -1].image;
      // Initialize total with the value of fprice
      total.value = +fprice.value;

      // get Cash phone
      vodcash.textContent = graduData[graduData.length - 1].vod__cash; //<<<<<<<<<<<<<<
      etiscash.textContent = graduData[graduData.length - 1].etis__cash; //<<<<<<<<<<<<<

      // Update total when inputx value changes
      inputx.addEventListener("change", dynamicExtra);

      function dynamicExtra() {
          let xval = inputx.value;
          let fval = fprice.value;
          let price = xprice.value;
          total.value = +fval + price * xval;
          poptotal.innerHTML=total.innerHTML;
        }
  }
  else
  {
    console.log("connection failed!");
  }
}); 


// get graduate data from dashboard (graduate free, extra, image)


/*var graduData = {"gradus": [
  {
    "graduId": 1,
    "free": 50,
    "extra": 100
  }]
};

xprice.value = graduData.gradus[0].extra;
fprice.value = graduData.gradus[0].free;


// Initialize total with the value of fprice
total.innerHTML = +fprice.value;

// Update total when inputx value changes
inputx.addEventListener("change", dynamicExtra);

function dynamicExtra() {
    let xval = inputx.value;
    let fval = fprice.value;
    let price = xprice.value;
    total.innerHTML = +fval + price * xval;
    poptotal.innerHTML=total.innerHTML;
}

// Admin change price for extra ticket
/* document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'x') {
        const newValue = prompt('Enter Price Of Extra ticket:');
        if (newValue !== null) {
            xprice.value = newValue;
            localStorage.setItem('xprice', newValue);
            total.innerHTML = +fprice.value + xprice.value * inputx.value;
            poptotal.innerHTML=total.innerHTML;
        }
    }
}); */
// Admin change price for free ticket
/* document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'f') {
        const newValue = prompt('Enter Price Of Free Ticket:');
        if (newValue !== null) {
            fprice.value = newValue;
            localStorage.setItem('fprice', newValue);
            total.innerHTML = +fprice.value + xprice.value * inputx.value;
            poptotal.innerHTML=total.innerHTML;
        }
    }
}); */
//////////////////////////////////////
function popup()
{ //if subnission success display msg
    document.getElementById("popup").style.top="55%";
    document.getElementById("bgcover").style.display="block";
}
///////////////////////

document.getElementById("graduate").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const free = formData.get("free");
  const number_of_tickets = formData.get("extra");
  const bill_amount = formData.get("total");

  try {
  //action attribute value "EndPoint" >>>> /graduate form submission 
      const response = await fetch("http://127.0.0.1:8000/api/userBill", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ free, number_of_tickets, bill_amount,event_id})
      });

      const data = await response.json();

      if (response.ok)
      {
        popup();   
      }
      else 
      {
        /* const errormsg = document.getElementById("errormsg");
        errormsg.style.display = "block"; */
        console.error("Submission failed:", data.message);
      }
  } 
  catch (error) {
      console.error("Error during submission:", error);
  }
});
////////////////////////////////

//Logout 
async function logout() {
  try {  
      //action attribute value "EndPoint" >>>> /logout
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });

      // Check if the logout request was successful (you may need to adjust this based on your API's response)
      if (response.ok) 
      {  //if ok remove token + redirect to login
          localStorage.removeItem("token");
          window.location.href = "../index.html";
      } 
      else 
      {
          console. error("Logout failed:", response. statusText);
      }
  } catch (error) {
      console.error("Error during logout:", error);
  }
}

// Example: Attach logout functionality to a logout button
document.getElementById("logout").addEventListener("click", logout);