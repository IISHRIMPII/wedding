document.addEventListener("DOMContentLoaded", function() {
    // --- Loading Screen --- 
    const loadingScreen = document.querySelector(".loading-screen");
    // Hide loading screen after animation + delay
    setTimeout(() => {
        loadingScreen.classList.add("hidden");
    }, 2000); // Adjust timing (1.5s animation + 0.5s delay = 2s)

    // --- Scrolling Watermark --- 
    const watermark = document.querySelector(".watermark-logo");
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateWatermarkPosition() {
        const scrollY = window.scrollY;
        // Calculate movement - adjust multiplier for desired speed/direction
        const moveY = scrollY * 0.2; 
        watermark.style.transform = `translate(-50%, calc(-50% + ${moveY}px))`;
        ticking = false;
    }

    window.addEventListener("scroll", function() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateWatermarkPosition();
                ticking = true;
            });
            ticking = true;
        }
    });
    // Initial position update
    updateWatermarkPosition();

    // --- Leaflet Map Initialization --- 
    // Placeholder coordinates (e.g., London)
    // Replace with actual coordinates when known
    const mapCoords = [51.505, -0.09]; 
    const map = L.map("map").setView(mapCoords, 13); // 13 is zoom level

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(map);

    // Add a marker
    L.marker(mapCoords).addTo(map)
        .bindPopup("Wedding Venue Location") // Replace with venue name
        .openPopup();
});
