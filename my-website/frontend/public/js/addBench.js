document.addEventListener('DOMContentLoaded', () => {
  var map = L.map('map').setView([39.9334, 32.8597], 13);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    center: [39.9170, 32.8597],
    zoom: 15,
    minZoom: 12,
    maxZoom: 22,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var formContainer = document.getElementById('form-container');
  var benchForm = document.getElementById('bench-form');
  var latInput = document.getElementById('lat');
  var lngInput = document.getElementById('lng');
  var ratingInput = document.getElementById('rating');
  var typeInput = document.getElementById('type');
  var materialInput = document.getElementById('material');
  var cancelButton = document.getElementById('cancel-btn');
  var findLocationButton = document.getElementById('find-location-btn');
  var addCurrentLocationButton = document.getElementById('add-current-location-btn');

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

  findLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: '../photos/blue_dot.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          })
        }).addTo(map)
          .bindPopup('You are here!')
          .openPopup();

        map.setView([lat, lng], 15); // Zoom in on user's location
      }, error => {
        alert('Unable to retrieve location.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  });

  addCurrentLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        latInput.value = lat;
        lngInput.value = lng;
        formContainer.style.display = 'block';
        map.setView([lat, lng], 15);
      }, error => {
        alert('Unable to retrieve location.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  });

  benchForm.onsubmit = function(e) {
    e.preventDefault();
    var formData = new FormData(benchForm);
    
    // Convert form data to an object and add the rating, type, and material
    var data = Object.fromEntries(formData);
    data['rating'] = ratingInput.value;
    data['type'] = typeInput.value;
    data['material'] = materialInput.value;

    fetch('/add-bench', {
      method: 'POST',
      body: JSON.stringify(data),
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
