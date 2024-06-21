document.addEventListener('DOMContentLoaded', () => {
    const trackButton = document.getElementById('trackButton');
    const map = L.map('map').setView([51.505, -0.09], 13);  // Default location (London)
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let marker;

    trackButton.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}<br>Accuracy: ${accuracy} meters`).openPopup();
        map.setView([latitude, longitude], 13);
    }

    function error() {
        alert('Unable to retrieve your location');
    }
});
