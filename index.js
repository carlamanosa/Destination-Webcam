//----------------------------------------------------------------------------------------------------------------//
//                                           Webcam Display Stuff
//----------------------------------------------------------------------------------------------------------------//


// Function for displaying webcam feeds
function displayWebcam() {
    // Clear contents of div for each click
    $("#main").empty();

    // API URL
    var queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/country=US?show=webcams:player";

    // Requesting data from webcam.travel API
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
            "x-rapidapi-key": "a1162ee7c6mshc800ab83c077685p1dfbd0jsn121aa30497f1"
        }
    }).then(function (response) {
        // Console logging response
        console.log(response);
        // Varibale creating a HTML elements
        var $videoDisplay = $("<iframe>");
        var $locationDisplay = $("<h3>");
        // Variables creating 
        var $videoDisplayElem = $("#main-video" + i);
        var $locationDisplayElem = $("#main-location" + i);
        // Variables for finding emebd links and locations for each webcam
        var embedDay = response.result.webcams[i].player.day.embed;
        var locationCam = response.result.webcams[i].title;
        var locationCamJSON = JSON.stringify(locationCam);
        // Looping through each item from result
        for (var i = 0; i < 3; i++) {
            // Adding data to elements
            $videoDisplay.attr("src", embedDay);
            $locationDisplay.text(locationCamJSON);
            // Appending elements to #main
            $($videoDisplayElem).html($videoDisplay);
            $($locationDisplayElem).html($locationDisplay);
            console.log(embedDay);
        }
    });
};
// Calling function
$("#begin").on("click", displayWebcam);







//----------------------------------------------------------------------------------------------------------------//
//                                           Google Maps Stuff
//----------------------------------------------------------------------------------------------------------------//



var map;

function createMap () {
  var options = {
    center: { lat: 43.654, lng: -79.383 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

var markers = [];
  
  searchBox.addListener('places_changed', function () {

    var places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {

        console.log("wtf");

      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));


      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });
    
    map.fitBounds(bounds);
  });
}










//----------------------------------------------------------------------------------------------------------------//
//                                           Other Stuff
//----------------------------------------------------------------------------------------------------------------//








