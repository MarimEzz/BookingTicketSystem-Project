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

// Counter for dataTrip Rows
function triprowcounter()
{
    var tabletrip = document.getElementById("tripdata");
    var rowst = tabletrip.getElementsByTagName("tr");
    var countt=1;
    for(var i=1; i<rowst.length;i++)
    {
        var rowt = rowst[i];
        var cellt = rowt.insertCell(0);
        cellt.textContent=countt++;
    }
}
triprowcounter();

// Counter for dataGraduate Rows
function graduaterowcounter()
{
    var tablegraduate = document.getElementById("graduatedata");
    var rowsg = tablegraduate.getElementsByTagName("tr");
    var countg=1;
    for(var i=1; i<rowsg.length;i++)
    {
        var rowg = rowsg[i];
        var cellg = rowg.insertCell(0);
        cellg.textContent=countg++;
    }
}
graduaterowcounter();
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