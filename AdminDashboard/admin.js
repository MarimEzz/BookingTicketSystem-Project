// Display Pages from Aside bar (dataTrip - dataGraduate - Controls)
function tripbtn()
{
    document.getElementById("imglogo").style.display="none";
    document.getElementById("graduate-data").style.display="none";
    document.getElementById("control").style.display="none";

    document.getElementById("trip-data").style.display="block";
}

function graduatebtn()
{
    document.getElementById("imglogo").style.display="none";
    document.getElementById("control").style.display="none";
    document.getElementById("trip-data").style.display="none";

    document.getElementById("graduate-data").style.display="block";
}

function controlbtn()
{
    document.getElementById("imglogo").style.display="none";
    document.getElementById("trip-data").style.display="none";
    document.getElementById("graduate-data").style.display="none";

    document.getElementById("control").style.display="flex";
}

// Aside buttons Activation
const buttons = document.querySelectorAll('.btnaside');
buttons.forEach(button=> {
  button.addEventListener('click', function(){
    buttons.forEach(btn=>{
      btn.classList.remove('active');

    });
    this.classList.add('active');
  });
});

//////////////////////////////////
// delete row buton on each form (trip - graduate)
function deleteRow(index) {
  travelsData.splice(index, 1);
  DisplayTravels();
}
///////////////////////////////////////
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

document.getElementById("formcontrol").addEventListener("submit",function(e)
{
  
  e.preventDefault();
  const formData = new FormData(e.target);
  var ticket_price = formData.get("trip-price");
  const location = formData.get("trip-name");
  const image = formData.get("trip-img");
  console.log(image);
  if (ticket_price == "") {
    ticket_price = formData.get("gfree-price");
  }
  const extra_price = formData.get("gextra-price");
  const gradeimg = formData.get("grade-img");
  const vod__cash = formData.get("vod-phone");
  const etis__cash = formData.get("etis-phone");
  const category = formData.get("choose");
  const formcontroldata = new FormData(this);
  //action attribute value /submit
  fetch("http://127.0.0.1:8000/api/event",{ //<<<<<<<<<<<<
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ ticket_price, location, image, extra_price, gradeimg, vod__cash, etis__cash, category}),
    
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
//////////////////////////////////////
// document.getElementById("formcontrol").addEventListener("submit", async (e) => {
//   e.preventDefault();
  
//   const formData = new FormData(e.target);
//   var ticket_price = formData.get("trip-price");
//   const location = formData.get("trip-name");
//   const image = formData.get("trip-img");
//   if (ticket_price == "") {
//     ticket_price = formData.get("gfree-price");
//   }
//   const extra_price = formData.get("gextra-price");
//   const gradeimg = formData.get("grade-img");
//   const vod__cash = formData.get("vod-phone");
//   const etis__cash = formData.get("etis-phone");
//   const category = formData.get("choose");


//   try {
//   //action attribute value "EndPoint" >>>> /Admin Controls
//       const response = await fetch("http://127.0.0.1:8000/api/event", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization : `Bearer ${localStorage.getItem("token")}`
//           },
//           body: JSON.stringify({ ticket_price, location, image, extra_price, gradeimg, vod__cash, etis__cash, category})
//       });
//       console.log(response);
//       const data = await response.json();

//       if (response.ok)
//       {
//         const successmsg = document.getElementById("successmsg");
//         successmsg.style.display = "block";      
//       }
//       else if (response.status === 401)
//       { // if Admin Unauthorized access go to login
//         window.location.href="../index.html";
//       }
//       else 
//       {
//         const errormsg = document.getElementById("errormsg");
//         errormsg.style.display = "block";
//         console.error("Submission failed:", data.message);
//       }
//   } 
//   catch (error) {
//       console.error("Error during submission:", error);
//   }
// });

/////////////////////////////////////
// Added Button To Download dataTrip on Excle File
function TravelToExcel() {
  let table = document.getElementsByTagName("table");
  TableToExcel.convert(table[0], { 
    name: `Travels.xlsx`,
    sheet: {
      name: 'Travels 1' // sheetName
    }
  });
}

// Added Button To Download dataGraduate on Excle File
function GraduateToExcel() {
  let table = document.getElementsByTagName("table"); 
  TableToExcel.convert(table[1], { 
    name: `Graduates.xlsx`, 
    sheet: {
      name: 'Graduates 1' // sheetName
    }
  });
}
///////////////////////////////////////
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
///////////////////////////

//////////////////////////////////
//... Get json travels data

var travelsData = [];
var travrequest =new XMLHttpRequest();
var token = localStorage.getItem('token');
//Here to put API GET for travels data
travrequest.open("GET","http://127.0.0.1:8000/api/travelbills");// <<<<<<<<<<<<<<<<<<<<<<<<<<<
travrequest.setRequestHeader('Authorization', 'Bearer ' + token);
travrequest.send();
travrequest.addEventListener("readystatechange", function(){
  if(travrequest.readyState == 4 && travrequest.status == 200)
  {
    //console.log(travrequest.response); //as string
    //travelsData =JSON.parse(travrequest.response).category;  //category:[{,,,}]

    travelsData =JSON.parse(travrequest.response);
    console.log(travelsData); //as Array
    
    DisplayTravels(); //display data
  }
  else
  {
    console.log("connection failed!");
  }
});

////////////////
//... Display travels data to table

function DisplayTravels()
{
  var box = ``;
  for(var i=0; i<travelsData.length; i++)
  {
    box +=
    ` <tr>
        <td>${travelsData[i].user.id}</td>
        <td>${travelsData[i].user.name}</td>
        <td>${travelsData[i].user.nid}</td>
        <td>${travelsData[i].user.university}</td>
        <td>${travelsData[i].event.location}</td>
        <td>${travelsData[i].user.phone}</td>
        <td>${travelsData[i].number_of_tickets}</td>
        <td>${travelsData[i].bill_amount}</td>
        <td><button class="del-trip-btn" onclick="deleteRow(${i})">حذف</button></td>
      </tr> `
  }
  document.getElementById("displayTrip").innerHTML = box;
}
//////////////////////////////////

//////////////////////////////////

//////////////////////////////////

//... Get json graduates data

var graduateData = [];
var gradrequest =new XMLHttpRequest();
//Here to put API GET for travels data
gradrequest.open("GET","http://127.0.0.1:8000/api/gradbills");
gradrequest.setRequestHeader('Authorization', 'Bearer ' + token);//<<<<<<<<<<<<<<<<<<<
gradrequest.send();
gradrequest.addEventListener("readystatechange", function(){
  if(gradrequest.readyState == 4 && gradrequest.status == 200)
  {
    //console.log(gradrequest.response); //as string
    //graduateData =JSON.parse(gradrequest.response).category;  //category:[{,,,}]

    graduateData =JSON.parse(gradrequest.response); //<<<<<<<<<<<<<
    console.log(graduateData); //as Array
    DisplayGraduate(); //display data
  }
  else
  {
    console.log("connection failed!");
  }
});

////////////////
//... Display graduates data to table

function DisplayGraduate()
{
  var box = ``;
  for(var i=0; i<graduateData.length; i++)
  {
    box +=
    ` <tr>
        <td>${graduateData[i].user.id}</td>
        <td>${graduateData[i].user.name}</td>
        <td>${graduateData[i].user.nid}</td>
        <td>${graduateData[i].user.university}</td>
        <td>${graduateData[i].user.phone}</td>
        <td>${graduateData[i].number_of_tickets}</td>
        <td>${graduateData[i].bill_status}</td>
        <td>${graduateData[i].bill_amount}</td> 
        <td><button class="del-graduate-btn">حذف</button></td>
      </tr> `
  }
  document.getElementById("displayGraduate").innerHTML = box;
}