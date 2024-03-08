//invalid message of inputs
var fulln = document.getElementById("fn");
var natiomalid = document.getElementById("sn");
var univ = document.getElementById("un");
var phone = document.getElementById("phone");
var ex = document.getElementById("extra");
fulln.setCustomValidity("Please Enter Your Full Name.");
natiomalid.setCustomValidity("Please Enter Your National ID (14 digits).");
univ.setCustomValidity("Please Enter Your University Name.");
phone.setCustomValidity("Enter Your Phone Number (11 digits), Support 010, 011, 012, and 015.");
ex.setCustomValidity("Maximum 3 only.");
fulln.addEventListener("input", function() {
    fulln.setCustomValidity("");
  });
  natiomalid.addEventListener("input", function() {
    natiomalid.setCustomValidity("");
  });
  univ.addEventListener("input", function() {
    univ.setCustomValidity("");
  });
  phone.addEventListener("input", function() {
    phone.setCustomValidity("");
  });
  ex.addEventListener("input", function() {
    ex.setCustomValidity("");
  });
/////////////////////////////////////////////////

const inputx = document.getElementById("extra");
const xprice = document.getElementById("extraprice");
const fprice = document.getElementById("freeprice");
const total = document.getElementById("total");
var poptotal = document.getElementById("ft");

// Update prices from localStorage if available
if (localStorage.getItem('xprice')) {
    xprice.value = localStorage.getItem('xprice');
}

if (localStorage.getItem('fprice')) {
    fprice.value = localStorage.getItem('fprice');
}

// Initialize total with the value of fprice
var totall=+fprice.value + +xprice.value * +inputx.value;
total.innerHTML = totall;

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
document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'x') {
        const newValue = prompt('Enter Price Of Extra ticket:');
        if (newValue !== null) {
            xprice.value = newValue;
            localStorage.setItem('xprice', newValue);
            total.innerHTML = +fprice.value + xprice.value * inputx.value;
            poptotal.innerHTML=total.innerHTML;
        }
    }
});
// Admin change price for free ticket
document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'f') {
        const newValue = prompt('Enter Price Of Free Ticket:');
        if (newValue !== null) {
            fprice.value = newValue;
            localStorage.setItem('fprice', newValue);
            total.innerHTML = +fprice.value + xprice.value * inputx.value;
            poptotal.innerHTML=total.innerHTML;
        }
    }
});
///////////////////////////////////////
// Function to check if national ID value is stored before
function isNationalIdStored(nationalId) 
{
  return nationalIds.includes(nationalId);
}
// Function to add a new national ID to the array
function addNationalId(nationalId)
{
  if (!isNationalIdStored(nationalId)) 
  {
      nationalIds.push(nationalId);
      localStorage.setItem("nationalIds", JSON.stringify(nationalIds));
      console.log("National ID added:", nationalId);
      popup();
  } 
  else 
  {
      console.log("National ID already exists:", nationalIds);
      alert("This National ID has already been submitted!");
  }
}

// Initialize an array to store national IDs
let nationalIds = JSON.parse(localStorage.getItem("nationalIds")) || [];

// Event listener for form submission
document.getElementById("graduate").addEventListener("submit", function(event)
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
console.log("National ID already exists:", nationalIds);

//////////////////////////////////////////

function popup()
{
    document.getElementById("popup").style.top="70%";
    document.getElementById("bgcover").style.display="block";
}