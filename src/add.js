import './scss/main.scss';
const apiUrl = "https://lab2-backend-v8ix.onrender.com/workexperience";

document.getElementById("add-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // hämta värden
    const companyname = document.getElementById("companyname").value;
    const jobtitle = document.getElementById("jobtitle").value;
    const locationValue = document.getElementById("location").value;
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;
    const description = document.getElementById("description").value;

    const errorDiv = document.getElementById("error-message");

    if (companyname.length < 2 || jobtitle.length < 2 || locationValue.length < 2 || !description) {
        errorDiv.innerText = "Vänligen fyll i alla fält med mer än 2 tecken.";
        return;
    }

    // skicka med fetch post
    try {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            companyname, 
            jobtitle, 
            location: locationValue, 
            startdate, 
            enddate, 
            description 
        })
    });

    if (response.ok) {
        window.location.href = "index.html";
    } else {
        errorDiv.innerText = "Något gick fel";
    }
} catch (error) {
    errorDiv.innerText = "Kunde inte ansluta till servern. Kontrollera att den är igång!";
}
});