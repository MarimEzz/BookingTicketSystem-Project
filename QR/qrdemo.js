var fn = document.getElementById("fn");
var sn = document.getElementById("sn");
var un = document.getElementById("un");
var phone = document.getElementById("phone");
var free = document.getElementById("free");
var extra = document.getElementById("extra");
const tripSelect = document.getElementById("tripname");
var ticnum = document.getElementById("ticnum");
var total = document.getElementById("total");
var pho_pattern = /^01[0-2,5]\d{8}$/;
var msg_war = document.getElementById("msg-war");
var msg = document.getElementById("msg");
var freeGrad=document.getElementById("free");
var tripData = []; //<<<<<<<<<<<<<<

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
      option.textContent = trip.location;
      tripSelect.appendChild(option);
      });
  }
});
var gardData = []; //<<<<<<<<<<<<<<

var getgrade =new XMLHttpRequest();
//Here to put API GET for travels data
getgrade.open("GET","http://127.0.0.1:8000/api/grad");// <<<<<<<<<<<<<<<<<<<<<<<<<<<
getgrade.send();
getgrade.addEventListener("readystatechange", function(){
  if(getgrade.readyState == 4 && getgrade.status == 200)
  {
    gardData =JSON.parse(getgrade.response);
    console.log(gardData); //as Array
    freeGrad.value = gardData[gardData.length-1].free_guests;
  }
});

var tripRadio = document.getElementById("trip");
var graduRadio = document.getElementById("gradu");
const tripDiv = document.getElementById("trip-choosen");
const graduDiv = document.getElementById("gradu-choosen");

tripRadio.addEventListener("change", function() {
    if (tripRadio.checked) {
        tripDiv.style.display = "flex";
        graduDiv.style.display = "none";
    }
});

graduRadio.addEventListener("change", function() {
    if (graduRadio.checked) {
        tripDiv.style.display = "none";
        graduDiv.style.display = "flex";
    }
});

//Genetate QR Code
function generate()
{
    if(fn.value.length <= 10)
    {
      msg_war.style.display="flex";
      msg.textContent="يرجى إدخال الإسم رباعي";
    }
    else if(sn.value.length != 14)
    {
      msg_war.style.display="flex";
      msg.textContent="يرجى إدخال الرقم القومي 14 رقم";
    }
    else if(un.value.length < 3)
    {
      msg_war.style.display="flex";
      msg.textContent="يرجى إدخال إسم الجامعة";
    }
    else if(!pho_pattern.test(phone.value))
    {
      msg_war.style.display="flex";
      msg.textContent="يرجى إدخال رقم الهاتف, يدعم 010, 011, 012, 015";
    }
    else if(tripRadio.checked && tripSelect.value == "")
    {
      msg_war.style.display="flex";
      msg.textContent="يرجى إدخال مكان الرحلة";
    }
    else if(tripRadio.checked && ticnum.value == 0)
    {
      msg_war.style.display="flex";
      msg.textContent="يرجى إدخال عدد التذاكر";
    }
    else if(graduRadio.checked && extra.value > 3) 
    {
      msg_war.style.display="flex";
      msg.textContent="أقصى عدد 3";
    }
    else
    {
      var qr = document.getElementById("qr");
      qr.innerHTML = "";
      var href;
      if (tripRadio.checked)
      {
        href ='"'+ fn.value +', '+ sn.value+', '+ un.value +', '+phone.value+ ', Trip: '+ tripSelect.value +', TicketNum: '+ ticnum.value +', Total: '+ total.value +'"';
      }
      else if(graduRadio.checked)
      {
        href ='"'+ fn.value +', '+ sn.value+', '+ un.value +', '+phone.value+', Free: '+free.value+', Extra: '+extra.value+', Total: '+ total.value +'"';
      }
      const size = 360;
      new QRCode(qr , {
          text: href,
          width: size,
          height: size,
          colorDark: "#040404",
          colorLight: "#e9eef4"
      })

    }
        
}

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
