// Selecting required elements
let events = document.getElementById("events");

let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");

let event = document.querySelectorAll(".event");

let menuBtn = document.querySelector(".menu-btn");
let sidebar = document.querySelector(".sidebar");

let profile = document.getElementById("profile");

// Current event number
let current = 0;

// Width of one event
let width = events.clientWidth;

// Right Arrow
rightBtn.addEventListener("click", function () {

    if (current < event.length - 1) {
        current++;
    } else {
        current = 0;
    }

    events.scrollLeft = current * width;
});

// Left Arrow
leftBtn.addEventListener("click", function () {

    if (current > 0) {
        current--;
    } else {
        current = event.length - 1;
    }

    events.scrollLeft = current * width;
});

// Auto Scroll every 3 seconds
setInterval(function () {

    if (current < event.length - 1) {
        current++;
    } else {
        current = 0;
    }

    events.scrollLeft = current * width;

}, 3000);

// Sidebar Toggle
menuBtn.addEventListener("click", function () {

    if (sidebar.style.display == "none") {
        sidebar.style.display = "block";
    } else {
        sidebar.style.display = "none";
    }

});

// Highlight Sidebar Link
let links = document.querySelectorAll(".sidebar a");

for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function () {

        for (let j = 0; j < links.length; j++) {
            links[j].style.background = "";
        }

        this.style.background = "#0077b6";

    });

}

// Profile Options
profile.addEventListener("change", function () {

    if (profile.value == "Profile") {
        alert("Opening Profile");
    }

    else if (profile.value == "Achievements") {
        alert("Opening Achievements");
    }

    else if (profile.value == "Status") {
        alert("Opening Status");
    }

    else if (profile.value == "Settings") {
        alert("Opening Settings");
    }

    else if (profile.value == "Logout") {
        alert("Logging Out");
    }

});