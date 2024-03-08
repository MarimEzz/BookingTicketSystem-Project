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

var fn = document.getElementById("fn");
var sn = document.getElementById("sn");
var un = document.getElementById("un");
var phone = document.getElementById("phone");
var free = document.getElementById("free");
var extra = document.getElementById("extra");

//Genetate QR Code
function generate()
{
        var qr = document.getElementById("qr");
        qr.innerHTML = "";
        const href ='"'+ fn.value +', '+ sn.value+', '+ un.value +', '+phone.value+', Free:'+free.value+', Extra:'+extra.value+'"';
        const size = 360;
        new QRCode(qr , {
            text: href,
            width: size,
            height: size,
            colorDark: "#040404",
            colorLight: "#e9eef4"
        })
}

// Initialize an array to store national IDs
let nationalIds = JSON.parse(localStorage.getItem("nationalIds")) || [];
// Function to add a new national ID to the array
function addNationalId(nationalId) {
  if (!nationalIds.includes(nationalId)) {
      nationalIds.push(nationalId);
      localStorage.setItem("nationalIds", JSON.stringify(nationalIds));
      console.log("National ID added:", nationalId);
      generate();
  } else {
      console.log("National ID already exists:", nationalIds);
      alert("This National ID has already been submitted!");
  }
}

// Event listener for form submission
function filterNID() {
  event.preventDefault(); // Prevent form submission
  let nationalId = document.getElementById("sn").value;
  addNationalId(nationalId);
};

//Download QR Code PNG
var link = document.getElementById("download");
function pngdown() {
  // Find the image inside the #qr div
    var image = document.getElementById("qr").getElementsByTagName("img");

    // Get the src attribute of the image, which is the data-encoded QR code
    var qrr = image[0].src;

    // Copy that to the download link
    link.href = qrr;
};
//Only user can submit once by filtering National ID





// Output the stored national IDs
console.log("Stored National IDs:", nationalIds);
//localStorage.clear(); //to delete all data
//localStorage.removeItem('key'); //to delete a specific ID



/*
>>>  //this is not the right way, user van refresh page or close window and submit again while all data on array reset!!
let inputArray = [];
document.getElementById("data").addEventListener("submit", function(event) {
    event.preventDefault();
    let inputValue = document.getElementById("sn").value;
    if (!inputArray.includes(inputValue)) {
        inputArray.push(inputValue);
        console.log("Updated array:", inputArray);
    } else {
        alert("This National ID has already been submitted!");
    }
    document.getElementById("sn").value = "";
});

*/