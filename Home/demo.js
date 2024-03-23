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
document.getElementById("logout").addEventListener("click", logout);