// Set up API
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

// Set up map
const map = L.map('map').setView([0, 0], 1);

// Marker
const myIcon = L.icon({
    iconUrl: './icons8-space-58.png',
    iconSize: [25, 25],
    iconAnchor: [10, 10],
});

const marker = L.marker([0, 0], {icon: myIcon}).addTo(map);

// Variables
const lat = document.getElementById("lat");
const long = document.getElementById("long")


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    noWrap: true,
    bounds: [[-90, -180], [90, 180]],
    attribution: '© OpenStreetMap'
}).addTo(map);

async function getISSLocation() {

    const response = await fetch(api_url);
    const data = await response.json();

    const {latitude, longitude} = data;

    lat.textContent = latitude.toFixed(2) + '°';
    long.textContent = longitude.toFixed(2) + '°';

    marker.setLatLng([latitude, longitude]);

}

getISSLocation();

setInterval(getISSLocation, 1000)