const navMenuAnchorTags = document.querySelectorAll(".nav-menu a");

//!random color for skills selection
const colors = ["#151F30", "#103778", "#0593A2", "#FF7A48", "#E3371E"];
var randomColor = document.querySelectorAll(".random-color");
for (let i = 0; i < randomColor.length; i++) randomColor[i].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

//! hambugger menu
var menuOpen = false;
var hambuggerMenu = document.querySelector(".box-out");
hambuggerMenu.addEventListener("click", () => {
    const box = document.querySelector("#box");
    if (!menuOpen) {
        document.getElementById("line1").style.transform = "rotate(45deg) translateX(11px)";
        document.getElementById("line2").style.opacity = "0";
        document.getElementById("line3").style.transform = "rotate(-45deg) translateX(11px)";
        box.style.height = "17rem";
        box.style.width = "6rem";
        box.style.backgroundColor = "white";
    } else {
        document.getElementById("line1").style.transform = "none";
        document.getElementById("line2").style.opacity = "1";
        document.getElementById("line3").style.transform = "none";
        box.style.height = "0rem";
        box.style.width = "0rem";
    }
    menuOpen = !menuOpen;
});

var interval;

for (let i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener("click", function (event) {
        event.preventDefault();
        const targetSectionID = this.textContent.trim().toLowerCase();
        const targetSection = document.getElementById(targetSectionID);
        interval = setInterval(scrollVertically, 20, targetSection);
    });
}

function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}

// Handle scroll event on window
var progressBars = document.querySelectorAll(".skills-progress > div");
var skillsContainer = document.getElementById("skills");
window.addEventListener("scroll", checkScroll);
var animationDone = false;

function initialiseBars() {
    for (let bar of progressBars) {
        bar.style.width = 0 + "%";
    }
}

initialiseBars();

function fillBars() {
    for (let bar of progressBars) {
        let targetWidth = bar.getAttribute("data-bar-width");
        let currentWidth = 0;
        let interval = setInterval(function () {
            if (currentWidth > targetWidth) {
                clearInterval(interval);
                return;
            }
            currentWidth++;
            bar.style.width = currentWidth + "%";
        }, 20);
    }
}

//! function fillBar(bar) {}

function checkScroll() {
    // You have to check whether container is visible
    var coordinates = skillsContainer.getBoundingClientRect();
    if (!animationDone && coordinates.top < window.innerHeight) {
        animationDone = true;
        // console.log("Skills Section Visible");
        fillBars();
    } else if (coordinates.top > window.innerHeight) {
        animationDone = false;
        initialiseBars();
    }
}
//! ensure that initial width of colored skill divs is Zero -> initialised/Reset to 0 width value
//! Start animation on every skill -> width from 0 to skill level at regular intervls
//! Store skill level -> HTML with the help data attribute
const scrollPercentage = document.getElementById("scroll-percent");
window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);
    // console.log(scrollPercentRounded);
    scrollPercentage.innerHTML = scrollPercentRounded + "% Viewed";
});
