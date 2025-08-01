const images = document.querySelectorAll('.welcome-bg');
let currentIndex = 0;

function changeBackground() {
    images.forEach((img, index) => {
        img.classList.remove('active');
        if (index === currentIndex) {
            img.classList.add('active');
        }
    });

    currentIndex = (currentIndex + 1) % images.length;
}

// Change every 3.5 seconds
setInterval(changeBackground, 3500);

// Initial load
changeBackground();

const textElement = document.querySelector("#welcome h2");
const text = "Mindora"; // Your text
let index = 0;
let isDeleting = false;

// Function to load the sound only when user interacts
function loadSound() {
    document.removeEventListener("click", loadSound); // Remove event listener after first click
    document.removeEventListener("keydown", loadSound);
    
    const typeSound = new Audio("typewriter.mp3"); // Load sound
    typeSound.volume = 0.5; // Adjust volume if needed
    typeSound.play().catch(error => console.log("Sound play error:", error));
}

// Ensure sound is allowed by user interaction
document.addEventListener("click", loadSound);
document.addEventListener("keydown", loadSound);

// Create multiple sound instances to prevent cutting off
const sounds = [
    new Audio("typewriter.mp3"),
    new Audio("typewriter.mp3"),
    new Audio("typewriter.mp3"),
    new Audio("typewriter.mp3")
];
let soundIndex = 0;

function playTypeSound() {
    sounds[soundIndex].currentTime = 0; // Reset sound
    sounds[soundIndex].play().catch(error => console.log("Sound play error:", error));
    soundIndex = (soundIndex + 1) % sounds.length; // Rotate through sounds
}

function typeWriter() {
    if (isDeleting) {
        // Erasing text
        textElement.textContent = text.substring(0, index);
        playTypeSound();
        index--;
        if (index < 0) {
            isDeleting = false;
            setTimeout(typeWriter, 1000);
            return;
        }
        setTimeout(typeWriter, 100);
    } else {
        // Typing text
        textElement.textContent = text.substring(0, index + 1);
        playTypeSound();
        index++;
        if (index > text.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000);
            return;
        }
        setTimeout(typeWriter, 200);
    }
}

typeWriter();

const scrollToTopBtn = document.getElementById("scrollToTop");
const progressCircle = document.querySelector("#scrollToTop circle");

function updateScroll() {
    let scrollTop = window.scrollY;
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = (scrollTop / docHeight) * 251.2; // 251.2 is full circle length

    // Show or hide button
    if (scrollTop > 100) {
        scrollToTopBtn.style.opacity = "1";
    } else {
        scrollToTopBtn.style.opacity = "0";
    }

    // Update circle stroke-dashoffset
    progressCircle.style.strokeDashoffset = 251.2 - scrollPercent;
}

// Scroll to top on click
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Detect scrolling
window.addEventListener("scroll", updateScroll);
