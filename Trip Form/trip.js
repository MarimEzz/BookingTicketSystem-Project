const inputf = document.getElementById("free");
const fpricetrip = document.getElementById("freeprice");
const total = document.getElementById("total");
const tripSelect = document.getElementById("tripname");
var poptotal = document.getElementById("ft");



var tripData = [];
var gettrip =new XMLHttpRequest();
//Here to put API GET for travels data
gettrip.open("GET",",,,url,,,");// <<<<<<<<<<<<<<<<<<<<<<<<<<<
gettrip.send();
gettrip.addEventListener("readystatechange", function(){
  if(gettrip.readyState == 4 && gettrip.status == 200)
  {
    //console.log(gettrip.response); //as string
    //tripData =JSON.parse(gettrip.response).category;  //category:[{,,,}]

    tripData =JSON.parse(gettrip.response); 
    console.log(tripData); //as Array
      // Populate select options
      tripData.trips.forEach(trip => {  //<<<<<<<<<<<<<<<<
      const option = document.createElement("option");
      option.value = trip.price;
      option.textContent = trip.destination;
      tripSelect.appendChild(option);
      });

      // Function to update price when option changes
      tripSelect.addEventListener("change", () => 
      {
        const selectedTripId = parseInt(tripSelect.value);
        const selectedTrip = tripData.trips.find(trip => trip.price === selectedTripId); //<<<<<<<<<
        if (selectedTrip) 
        {
        fpricetrip.value = `${selectedTrip.price}`;
        } 
        else 
        {
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
      calcTotal(); // Update the total
      });
  }
  else
  {
    console.log("connection failed!");
  }
}); 
/* 

// get trip data from dashboard (tripnames, tripprices, image)
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
  const selectedTripId = parseInt(tripSelect.value);
  const selectedTrip = tripsData.trips.find(trip => trip.price === selectedTripId);
  if (selectedTrip) {
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
  calcTotal(); // Update the total
}); */


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
  const free = formData.get("free");

  try {
  //action attribute value "EndPoint" >>>> /trip form submission 
      const response = await fetch("/////////", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ tripname, free})
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
      const response = await fetch("//////", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      });

      // Check if the logout request was successful (you may need to adjust this based on your API's response)
      if (response.ok) 
      {  //if ok remove token + redirect to login
          localStorage.removeItem("token");
          window.location.href = "../SignLog/signlog.html";
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