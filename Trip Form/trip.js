const inputf = document.getElementById("free");
const fpricetrip = document.getElementById("freeprice");
const total = document.getElementById("total");
const tripSelect = document.getElementById("tripname");
const inputId = document.getElementById("tripId");
var poptotal = document.getElementById("ft");
var selectedTrip;
const vodcash = document.getElementById("vod-cash");
const path="http://127.0.0.1:8000/images/";
const etiscash = document.getElementById("etis-cash");

var tripData = [];
var gettrip =new XMLHttpRequest();
//Here to put API GET for travels data
gettrip.open("GET","http://127.0.0.1:8000/api/travel");// <<<<<<<<<<<<<<<<<<<<<<<<<<<
gettrip.send();
gettrip.addEventListener("readystatechange", function(){
  if(gettrip.readyState == 4 && gettrip.status == 200)
  {
    //console.log(gettrip.response); //as string
    //tripData =JSON.parse(gettrip.response).category;  //category:[{,,,}]

    tripData =JSON.parse(gettrip.response); 
    console.log(tripData); //as Array
      // Populate select options
      tripData.forEach(trip => {  //<<<<<<<<<<<<<<<<
      const option = document.createElement("option");
      option.value = trip.id;
      option.textContent = trip.location;
      tripSelect.appendChild(option);
      });

      // Function to update price when option changes
      tripSelect.addEventListener("change", () => 
      {
        const selectedTripPrice = parseInt(tripSelect.value);
        selectedTrip = tripData.find(trip => trip.id === selectedTripPrice);
        if (selectedTrip) {
        inputId.value = selectedTrip.id;
        fpricetrip.value = selectedTrip.ticket_price;
        // get Cash phone
        vodcash.textContent = selectedTrip.vod__cash;
        etiscash.textContent = selectedTrip.etis__cash;
        // get image
        document.getElementById("imgtripform").src = selectedTrip.image;
      } 
      else 
      {
        fpricetrip.value = "";
      }
      });

      // Initialize total with the value of fprice
      function calcTotal() 
      {
        total.value = +fpricetrip.value * +inputf.value;
        poptotal.innerHTML=total.innerHTML;
      }
      // Update total when inputf value changes
      inputf.addEventListener("change", calcTotal);

      // Update total when trip otion changes
      tripSelect.addEventListener("change", () =>
      {
        // Get the selected trip's price
        const selectedTripPrice = parseInt(tripSelect.value);
        fpricetrip.value = selectedTrip.ticket_price; 
        inputId.value = `${selectedTrip.id}`;
        // update Cash phone
        vodcash.textContent = selectedTrip.vod__cash;
        etiscash.textContent = selectedTrip.etis__cash;
        // update img
        document.getElementById("imgtripform").src = path+selectedTrip.image;
        calcTotal(); // Update the total
      });
  }
  else
  {
    console.log("connection failed!");
  }
}); 
/*

// get trip data from dashboard (tripnames, tripnum"free", image)
const tripsData = {   //<<<<<<<<<<<<<<
  "trips": [
    {
      "tripId": 1,
      "destination": "Paris",
      "price": 300
    },
    {
      "tripId": 2,
      "destination": "Tokyo",
      "price": 800
    },
    {
      "tripId": 3,
      "destination": "New York",
      "price": 600
    }
  ]
};

// Populate select options
tripsData.trips.forEach(trip => {  //<<<<<<<<<<<<<<<<
  const option = document.createElement("option");
  option.value = trip.price;
  option.textContent = trip.destination;
  tripSelect.appendChild(option);
});

// Function to update price when option changes
tripSelect.addEventListener("change", () => {
  const selectedTripPrice = parseInt(tripSelect.value);
  selectedTrip = tripsData.trips.find(trip => trip.price === selectedTripPrice);
  if (selectedTrip) {
    inputId.value = `${selectedTrip.tripId}`;
    fpricetrip.value = `${selectedTrip.price}`;
  } else {
    fpricetrip.value = "";
  }
});

// Initialize total with the value of fprice
function calcTotal() {
  total.innerHTML = +fpricetrip.value * +inputf.value;
  poptotal.innerHTML=total.innerHTML;
}
// Update total when inputf value changes
inputf.addEventListener("change", calcTotal);

// Update total when trip otion changes
tripSelect.addEventListener("change", () => {
  // Get the selected trip's price
  const selectedTripPrice = parseInt(tripSelect.value);
  fpricetrip.value = selectedTripPrice; 
  inputId.value = `${selectedTrip.tripId}`;
  calcTotal(); // Update the total
});
*/

// Admin change price for free ticket
/* document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'f') {
        const newValue = prompt('Enter Price Of Free Ticket:');
        if (newValue !== null) {
            fpricetrip.value = newValue;
            localStorage.setItem('fpricetrip', newValue);
            total.innerHTML = +fpricetrip.value * inputf.value;
            poptotal.innerHTML=total.innerHTML;
        }
    }
}); */

/////////////////////////////////////////

function popup()
{ //if subnission success display msg
    document.getElementById("popup").style.top="55%";
    document.getElementById("bgcover").style.display="block";
}
///////////////////////////
document.getElementById("trip").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const tripname = formData.get("tripname");
  const number_of_tickets = formData.get("free");
  const event_id = formData.get("tripId");
  const bill_amount = formData.get("total");
  try {
  //action attribute value "EndPoint" >>>> /trip form submission 
      const response = await fetch("http://127.0.0.1:8000/api/userBill", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ tripname, number_of_tickets, event_id, bill_amount})
      });
      const data = await response.json();

      if (response.ok)
      {
        popup();   
      }
      else 
      {
        const errormsg = document.getElementById("errormsg");
        errormsg.style.display = "block"; 
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