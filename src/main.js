import './scss/main.scss';
const apiUrl = "https://lab2-backend-v8ix.onrender.com/workexperience";

async function getExperiences() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const listContainer = document.getElementById("experience-list");
        listContainer.innerHTML = "";

        data.forEach(work => {
            listContainer.innerHTML += `
            <div class="card">
            <h3>${work.jobtitle} PÅ ${work.companyname}</h3>
            <p><strong>Plats:</strong> ${work.location}</p>
            <p><strong>Period:</strong> ${work.startdate} - ${work.enddate || 'Pågående'}</p>
            <p class="description">${work.description}</p>
            <button onclick="deleteExperience(${work.id})">Radera</button>
            </div>
            `;
        });
    } catch (error) {
        console.error("Fel vid hämtning: ", error)
    }
}

// delete-funktion
async function deleteExperience(id) {
    if (confirm("Är du säker på att du vill radera?")) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                getExperiences();
            } else {
                alert("Kunde inte radera.");
            }
        } catch (error) {
            console.error("Fel vid radering:", error);
        }
    }
}

// gör funktionen global
window.deleteExperience = deleteExperience;

// starta hämtning
getExperiences();