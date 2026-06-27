const API = "http://localhost:5000/api/events";

const eventsContainer = document.getElementById("events");
const modal = document.getElementById("modal");

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const eventForm = document.getElementById("eventForm");

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

let events = [];

/* ------------------------------
   Modal
------------------------------ */

openModal.onclick = () => {
    modal.style.display = "block";
};

closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

/* ------------------------------
   Load Events
------------------------------ */

async function loadEvents() {
    try {

        const res = await fetch(API);

        events = await res.json();

        renderEvents(events);

    } catch (err) {

        console.log(err);

        alert("Unable to load events.");

    }
}

/* ------------------------------
   Render Events
------------------------------ */

function renderEvents(data) {

    eventsContainer.innerHTML = "";

    if (data.length === 0) {

        eventsContainer.innerHTML =
            "<h2>No Events Found</h2>";

        return;
    }

    data.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `

            <span class="category">${event.category}</span>

            <h2>${event.title}</h2>

            <p>${event.description}</p>

            <p><strong>📅</strong> ${event.date}</p>

            <p><strong>🕒</strong>
            ${event.startTime} - ${event.endTime}</p>

            <p><strong>📍</strong> ${event.venue}</p>

            <p><strong>👤</strong> ${event.organizer}</p>

            <p><strong>❤️ Interested:</strong>
            ${event.interested}</p>

            <div class="actions">

                <button
                    class="interested"
                    onclick="increaseInterest('${event._id}')"
                >
                    Interested
                </button>

                <button
                    class="delete"
                    onclick="deleteEvent('${event._id}')"
                >
                    Delete
                </button>

            </div>

        `;

        eventsContainer.appendChild(card);

    });

}

/* ------------------------------
   Create Event
------------------------------ */

eventForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const event = {

        title: document.getElementById("title").value,

        description:
            document.getElementById("description").value,

        date:
            document.getElementById("date").value,

        startTime:
            document.getElementById("startTime").value,

        endTime:
            document.getElementById("endTime").value,

        venue:
            document.getElementById("venue").value,

        organizer:
            document.getElementById("organizer").value,

        category:
            document.getElementById("eventCategory").value

    };

    try {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(event)

        });

        modal.style.display = "none";

        eventForm.reset();

        loadEvents();

    } catch (err) {

        console.log(err);

    }

});

/* ------------------------------
   Delete
------------------------------ */

async function deleteEvent(id) {

    if (!confirm("Delete Event?"))
        return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadEvents();

}

/* ------------------------------
   Interested
------------------------------ */

async function increaseInterest(id) {

    await fetch(`${API}/${id}/interested`, {

        method: "PATCH"

    });

    loadEvents();

}

/* ------------------------------
   Search
------------------------------ */

searchInput.addEventListener("input", filter);

/* ------------------------------
   Category
------------------------------ */

categorySelect.addEventListener("change", filter);

function filter() {

    let filtered = [...events];

    const search = searchInput.value.toLowerCase();

    const category = categorySelect.value;

    if (search !== "") {

        filtered = filtered.filter(event =>
            event.title.toLowerCase().includes(search)
        );

    }

    if (category !== "All") {

        filtered = filtered.filter(event =>
            event.category === category
        );

    }

    renderEvents(filtered);

}

/* ------------------------------
   Initial Load
------------------------------ */

loadEvents();