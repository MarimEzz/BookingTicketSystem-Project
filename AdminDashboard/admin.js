

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
//////////////////////////////////

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

document.getElementById("control").addEventListener("submit",function(e)
{
  e.preventDefault();
  const controlformdata = new FormData(this);
  //action attribute value "EndPoint" >>>> /submit
  fetch("/submit",{
    method: "POST",
    body:controlformdata
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
