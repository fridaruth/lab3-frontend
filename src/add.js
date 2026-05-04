import './scss/main.scss';
const apiUrl = "https://lab3-2htd.onrender.com/workexperience";

document.getElementById("add-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // hämta värden
    const companyname = document.getElementById("companyname").value.trim();
    const jobtitle = document.getElementById("jobtitle").value.trim();
    const locationValue = document.getElementById("location").value.trim();
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;
    const description = document.getElementById("description").value.trim();

    const errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = "";

    if (!companyname || !jobtitle || !locationValue || !startdate || !description) {
        errorDiv.innerText = "Vänligen fyll i alla obligatoriska fält!";
        return;
    }

    if (companyname.length < 2 || jobtitle.length < 2) {
        errorDiv.innerText = "Företagsnamn och jobbtitel måste ha mer än 2 tecken.";
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
        const errorData = await response.json();
        errorDiv.innerText = "Något gick fel: " + (errorData.error || "Kunde inte spara.");
    }
} catch (error) {
    errorDiv.innerText = "Kunde inte ansluta till servern. Kontrollera din anslutning!";
}
});