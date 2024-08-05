document.addEventListener('DOMContentLoaded', () => {
  var map = L.map('map').setView([39.9334, 32.8597], 13); // Center on Ankara with zoom level 13

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {   
    center: [39.9170, 32.8597], // Center on Çankaya
    zoom: 15, // Initial zoom level
    minZoom: 12, // Minimum zoom level to prevent zooming out too much
    maxZoom: 22,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var southWest = L.latLng(39.8000, 32.8000),
      northEast = L.latLng(40.0500, 33.0000);
  var bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);
  map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
  });

  fetch('/benches')
    .then(response => response.json())
    .then(benches => {
      benches.forEach(bench => {
        var row = document.querySelector('#bench-table tbody').insertRow();
        row.insertCell(0).textContent = bench.id;
        row.insertCell(1).textContent = bench.lat;
        row.insertCell(2).textContent = bench.lng;
        row.insertCell(3).textContent = bench.type;
        row.insertCell(4).textContent = bench.place;
        row.insertCell(5).textContent = bench.rating;

        var benchIcon = L.icon({
          iconUrl: 'bench.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        var marker = L.marker([bench.lat, bench.lng], { icon: benchIcon }).addTo(map);
        marker.bindPopup(`
          <b>Type:</b> ${bench.type}<br>
          <b>Place:</b> ${bench.place}<br>
          <b>Rating:</b> ${bench.rating}/10
        `);
      });
    });
});
