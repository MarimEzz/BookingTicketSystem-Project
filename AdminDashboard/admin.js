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
/*const tripTable = document.getElementById("tripdata");
const graduateTable = document.getElementById("graduatedata");

const tripDeleteButtons = document.querySelectorAll('.del-trip-btn');
tripDeleteButtons.forEach(button => {
  button.addEventListener('click', deleteTRow);
});

const graduateDeleteButtons = document.querySelectorAll('.del-graduate-btn');
graduateDeleteButtons.forEach(button => {
  button.addEventListener('click', deleteGRow);
});

function deleteTRow(event) {
  const button = event.target;
  const row = button.closest('tr');
  if (row) {
    fetch(`/////`, { method: 'DELETE' }) //delete row from travel
      .then(response => {
        if (response.ok) {
          // Remove the row from the table
          row.remove();
          updateTripCounter();
        } else {
          console.error('Failed to delete trip:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting trip:', error);
      });
  }
}

function deleteGRow(event) {
  const button = event.target;
  const row = button.closest('tr');
  if (row) {
    fetch(`/////`, { method: 'DELETE' }) //delete row from graduate
      .then(response => {
        if (response.ok) {
          // Remove the row from the table
          row.remove();
          updateGraduateCounter();
        } else {
          console.error('Failed to delete Graduate:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting Graduate:', error);
      });
  }
}
// update row counter when delete row
function updateTripCounter() {
  const rows = tripTable.querySelectorAll('tr');
  for (let i = 1; i < rows.length; i++) {
    const cell = rows[i].querySelector('td:first-child');
    if (cell) {
      cell.textContent = i;
    }
  }
}
updateTripCounter();
function updateGraduateCounter() {
  const rows = graduateTable.querySelectorAll('tr');
  for (let i = 1; i < rows.length; i++) {
    const cell = rows[i].querySelector('td:first-child');
    if (cell) {
      cell.textContent = i;
    }
  }
}
updateGraduateCounter();*/
///////////////////////////////////////

document.getElementById("formcontrol").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const tripprice = formData.get("trip-price");
  const tripname = formData.get("trip-name");
  const tripimg = formData.get("trip-img");
  const graduate_free = formData.get("gfree-price");
  const graduate_extra = formData.get("gextra-price");
  const gradeimg = formData.get("grade-img");

  try {
  //action attribute value "EndPoint" >>>> /Admin Controls
      const response = await fetch("/////////", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ tripprice, tripname, tripimg, graduate_free, graduate_extra, gradeimg})
      });

      const data = await response.json();

      if (response.ok)
      {
        const successmsg = document.getElementById("successmsg");
        successmsg.style.display = "block";      
      }
      else if (response.status === 401)
      { // if Admin Unauthorized access go to login
        window.location.href="../SignLog/singlog.html";
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
    const tableRow = document.querySelector('#tripdata caption');
    if (tableRow) {
        tableRow.remove();
    }
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
        <td>${travelsData[i].user.phone}</td>
        <td>${travelsData[i].number_of_tickets}</td>
        <td><button class="del-trip-btn">حذف</button></td>
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

    graduateData =JSON.parse(gradrequest.response).carts; //<<<<<<<<<<<<<
    console.log(graduateData); //as Array
    const tableRow = document.querySelector('#graduatedata caption');
    if (tableRow) {
        tableRow.remove();
    }
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
        <td>${graduateData[i].id}</td>
        <td>${graduateData[i].products[0].title}</td>
        <td>${graduateData[i].products[0].discountPercentage}</td>
        <td>${graduateData[i].products[0].unv}</td>
        <td>${graduateData[i].products[0].phone}</td>
        <td>${graduateData[i].products[0].quantity}</td>
        <td>${graduateData[i].products[0].total}</td>
        <td>${travelsData[i].user.total}</td> 
        <td><button class="del-graduate-btn">حذف</button></td>
      </tr> `
  }
  document.getElementById("displayGraduate").innerHTML = box;
}