// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  navigator.geolocation.getCurrentPosition(success);
});

$('#submit').on('click', function(event) {
  event.preventDefault();
  drawMap();
});

function drawMap() {
  var start = $('#start').val();
  var end = $('#end').val();

  var options = { method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/directions/json',
    qs:
     { origin: start,
       destination: end,
       key: process.env.MAPS_API_KEY }
    };

  $.ajax(options).done(function(result) {
    console.log(result);
  });

  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //
  //   console.log(JSON.parse(body));
  //   var steps = JSON.parse(body).routes[0].legs[0];
  //   //res.json(JSON.parse(body));
  //   res.render('index', {steps: steps.steps, duration: steps.duration.text, distance: steps.distance.text, start: steps.start_address, end: steps.end_address, api_key: process.env.MAPS_API_KEY});
  // });
}




var lat, long;

function success(pos) {
  var crd = pos.coords;

  lat = crd.latitude;
  long = crd.longitude;
}

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
    });
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    });
    directionsDisplay.setMap(map);
    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('submit').addEventListener('click', onChangeHandler);
  }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
