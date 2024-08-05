document.addEventListener('DOMContentLoaded', () => {
  var map = L.map('map').setView([39.9334, 32.8597], 13); // Center on Ankara with zoom level 13

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    center: [39.9170, 32.8597], // Center on Çankaya
    zoom: 15, // Initial zoom level
    minZoom: 12, // Minimum zoom level to prevent zooming out too much
    maxZoom: 22,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var formContainer = document.getElementById('form-container');
  var benchForm = document.getElementById('bench-form');
  var latInput = document.getElementById('lat');
  var lngInput = document.getElementById('lng');
  var cancelButton = document.getElementById('cancel-btn');

  var southWest = L.latLng(39.8000, 32.8000),
      northEast = L.latLng(40.0500, 33.0000);
  var bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);
  map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
  });

  map.on('dblclick', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    latInput.value = lat;
    lngInput.value = lng;
    formContainer.style.display = 'block';
    formContainer.style.left = e.originalEvent.pageX + 'px';
    formContainer.style.top = e.originalEvent.pageY + 'px';
  });

  benchForm.onsubmit = function(e) {
    e.preventDefault();
    var formData = new FormData(benchForm);
    fetch('/add-bench', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.text())
    .then(data => {
      alert(data);
      formContainer.style.display = 'none';
      benchForm.reset();
    });
  };

  cancelButton.onclick = function() {
    formContainer.style.display = 'none';
    benchForm.reset();
  };
});
