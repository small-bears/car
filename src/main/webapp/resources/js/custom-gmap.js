(function ($) {
  "use strict"; // Start of use strict
  // map 
  var myLatLng = { lat: 40.6971494, lng: -74.2598712 };

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('gmap'), {
    center: myLatLng,
    zoom: 3
  });
  // Create a marker and set its position.
  var mapMarker = new google.maps.Map(document.getElementById('gmap-marker'), {
    center: myLatLng,
    zoom: 3
  });

  var marker = new google.maps.Marker({
    map: mapMarker,
    position: myLatLng,
    title: 'Hello World!'
  });
  // route map
  var routeMap = new google.maps.Map(document.getElementById('routeMap'), {
    zoom: 2,
    center: { lat: 0, lng: -180 },
    mapTypeId: 'terrain'
  });

  var flightPlanCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 }
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(routeMap);

})(jQuery);
