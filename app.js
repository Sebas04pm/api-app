var apiKey = "at_kRqL5L28qVca0VTSX7peC0f9lQhXG";
var map = L.map('map').setView([0, 0], 13);
var initialIpAddress; // Variable para almacenar la dirección IP inicial

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para buscar una dirección IP o dominio
function searchLocation(searchValue) {
  var apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${searchValue}`;

  // Obtener la información de ubicación basada en la dirección IP o dominio
  $.getJSON(apiUrl)
    .done(function(data) {
      var lat = data.location.lat;
      var lng = data.location.lng;
      var locationInfo = `
        <strong>IP:</strong> ${data.ip}<br>
        <strong>Country:</strong> ${data.location.country}<br>
        <strong>Region:</strong> ${data.location.region}<br>
        <strong>Domain:</strong> ${data.as.domain}<br>
        <strong>Timezone:</strong> ${data.location.timezone}<br>
        <strong>Postal Code:</strong> ${data.location.postalCode}
      `;
      L.marker([lat, lng]).addTo(map)
        .bindPopup(locationInfo)
        .openPopup();
      map.setView([lat, lng], 13);
    })
    .fail(function() {
      alert("Unable to find the specified IP Address or Domain.");
    });
}

// Manejar la búsqueda cuando se hace clic en el botón de búsqueda
$("#search-button").click(function() {
  var searchValue = $("#search-input").val();
  searchLocation(searchValue);
});

// Manejar la búsqueda cuando se presiona la tecla Enter en el campo de entrada de búsqueda
$("#search-input").keypress(function(e) {
  if (e.which === 13) {
    var searchValue = $("#search-input").val();
    searchLocation(searchValue);
  }
});

// Obtener la dirección IP del usuario y mostrar suubicación inicial
$.getJSON('https://api.ipify.org?format=json')
  .done(function(data) {
    initialIpAddress = data.ip; // Almacenar la dirección IP inicial
    $(".user-ip").append(` ${initialIpAddress}`); // Mostrar la dirección IP del usuario
    searchLocation(initialIpAddress); // Buscar la ubicación inicial
  });

// Manejar el clic en el botón de reset
$("#reset-button").click(function() {
  $("#search-input").val(''); // Restablecer el valor de búsqueda en la barra de búsqueda
  searchLocation(initialIpAddress); // Buscar la ubicación inicial
});

// Manejar el clic en el botón de modo oscuro
$("#dark-mode-button").click(function() {
  $("body").toggleClass("dark-mode"); // Alternar la clase "dark-mode" en el body
});