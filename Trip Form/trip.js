//invalid message of inputs
var fulln = document.getElementById("fn");
var natiomalid = document.getElementById("sn");
var phone = document.getElementById("phone");
fulln.setCustomValidity("Please Enter Your Full Name.");
natiomalid.setCustomValidity("Please Enter Your National ID (14 digits).");
phone.setCustomValidity("Enter Your Phone Number (11 digits), Support 010, 011, 012, and 015.");
fulln.addEventListener("input", function() {
    fulln.setCustomValidity("");
  });
  natiomalid.addEventListener("input", function() {
    natiomalid.setCustomValidity("");
  });
  phone.addEventListener("input", function() {
    phone.setCustomValidity("");
  });

/////////////////////////////////////////////////

const inputf = document.getElementById("free");
const fpricetrip = document.getElementById("freeprice");
const total = document.getElementById("total");
var poptotal = document.getElementById("ft");

// Update prices from localStorage if available

if (localStorage.getItem('fpricetrip')) {
    fpricetrip.value = localStorage.getItem('fpricetrip');
}

// Initialize total with the value of fprice
var totall=+fpricetrip.value * +inputf.value;
total.innerHTML = totall;

// Update total when inputx value changes
inputf.addEventListener("change", dynamicExtra);

function dynamicExtra() {
    let xval = inputf.value;
    let fval = fpricetrip.value;
    total.innerHTML = +fval * xval;
    poptotal.innerHTML=total.innerHTML;
}

// Admin change price for free ticket
document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'f') {
        const newValue = prompt('Enter Price Of Free Ticket:');
        if (newValue !== null) {
            fpricetrip.value = newValue;
            localStorage.setItem('fpricetrip', newValue);
            total.innerHTML = +fpricetrip.value * inputf.value;
            poptotal.innerHTML=total.innerHTML;
        }
    }
});
///////////////////////////////////////
// Function to check if national ID value is stored before
function isNationalIdStored(nationalId) 
{
  return nationalIdsrrip.includes(nationalId);
}
// Function to add a new national ID to the array
function addNationalId(nationalId)
{
  if (!isNationalIdStored(nationalId)) 
  {
    nationalIdsrrip.push(nationalId);
      localStorage.setItem("nationalIdsrrip", JSON.stringify(nationalIdsrrip));
      console.log("National ID added:", nationalId);
      popup();
  } 
  else 
  {
      console.log("National ID already exists:", nationalIdsrrip);
      alert("This National ID has already been submitted!");
  }
}

// Initialize an array to store national IDs
let nationalIdsrrip = JSON.parse(localStorage.getItem("nationalIdsrrip")) || [];

// Event listener for form submission
document.getElementById("trip").addEventListener("submit", function(event)
{
  event.preventDefault(); // Prevent form submission
  let nationalId = document.getElementById("sn").value;
  if (this.checkValidity()) 
  {
    addNationalId(nationalId);
  } 
  else 
  {
    // Display an alert if any input is invalid
    alert("Please fill out all fields correctly.");
  }
});

//localStorage.clear(); //to delete all data
//localStorage.removeItem('key'); //to delete a specific ID
console.log("National ID already exists:", nationalIdsrrip);

//////////////////////////////////////////

function popup()
{
    document.getElementById("popup").style.top="70%";
    document.getElementById("bgcover").style.display="block";
}