
$(document).ready(function () {

  //----------------------------------------------------------------------------------------------------------------//
  //                                           Webcam Display Stuff
  //----------------------------------------------------------------------------------------------------------------//

  // Calling function


  //----------------------------------------------------------------------------------------------------------------//
  //                                           Webcam Random Function
  //----------------------------------------------------------------------------------------------------------------//


  // Function for displaying webcam feeds
  function randomWebcam() {
    // API URL
    var queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/orderby=random?show=webcams:player";

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
      // Looping through each prev display to clear it
      for (var i = 0; i < 3; i++) {
        var $whichMain = "#main" + i;
        $($whichMain).empty();
      }
      // Looping through each item from result
      for (var i = 0; i < 3; i++) {
        // Function creating new HTML elements
        function webcamDiv(i) {
          // Variables for finding emebd links and locations for each webcam
          var embedDay = response.result.webcams[i].player.day.embed;
          var locationCam = response.result.webcams[i].title;
          var $whichMain = "#main" + i;
          // Creating HTML elements
          var $newDiv = $("<div>");
          var $newVideo = $("<iframe>");
          var $newLocation = $("<h5>");
          // Attaching data to elements
          // Video
          $newVideo.attr("src", embedDay);
          $newVideo.attr("value", i);
          $newVideo.attr("class", "main-video")
          // Location Header
          $newLocation.text(locationCam);
          $newLocation.attr("value", i);
          $newLocation.attr("class", "main-location")
          // Appending elements
          $newDiv.append($newVideo);
          $newDiv.append($newLocation);
          $newDiv.attr("class", "feed");
          $($whichMain).append($newDiv);
        };
        webcamDiv(i);
      };
    });
  };
  // Calling function
  $("#randBtnDiv").on("click", randomWebcam);


  //----------------------------------------------------------------------------------------------------------------//
  //                                           Google Maps Stuff
  //----------------------------------------------------------------------------------------------------------------//


  function geocode(location) {
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?";
    var queryParams = $.param({
      address: location,
      key: 'AIzaSyAMGnVG45Aa7TXiqBhficDiazh-Sjprmeg'
    })
    $.ajax({
      url: queryURL + queryParams,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var position = response.results[0].geometry.location;
      latitudeLoc = response.results[0].geometry.location.lat;
      longitudeLoc = response.results[0].geometry.location.lng;
      console.log("this", latitudeLoc);
      console.log(longitudeLoc);

      infoWindow.setPosition(position);
      infoWindow.setContent('Geocode location!');
      infoWindow.open(map);
      map.setCenter(position);
      displayWebcam()
    })
  }

  createMap();

  function createMap () {
    var options = {
      center: { lat: 43.654, lng: -79.383 },
      zoom: 10
    };
  
    map = new google.maps.Map(document.getElementById('map'), options);
    infoWindow = new google.maps.InfoWindow;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (p) {
        var position = {
          lat: p.coords.latitude,
          lng: p.coords.longitude
        };
  
        infoWindow.setPosition(position);
        infoWindow.setContent('Your location!');
        infoWindow.open(map);
        map.setCenter(position);
      }, function () {
        handleLocationError('Geolocation service failed', map.getCenter());
      });
    } else {
      handleLocationError('No geolocation available.', map.getCenter());
    }
  }
  


  var geocoder = new google.maps.Geocoder();

  $("#submit").on("click", function () {
    geocode($("#address").val());
  })

  function geocodeAddress(geocoder, resultsMap) {
    console.log("geocodeAddress() called");
    var address = document.getElementById('address').value;
    console.log(address);
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }










  //----------------------------------------------------------------------------------------------------------------//
  //                                           Other Stuff
  //----------------------------------------------------------------------------------------------------------------//

  // Parallax Initialize


});

var map;
var infoWindow;
var latitudeLoc;
var longitudeLoc;

// Function for displaying webcam feeds
function displayWebcam() {
  // API URL
  var queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/nearby=" + latitudeLoc + "," + longitudeLoc + ",50/orderby=popularity?show=webcams:player";

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
    // Looping through each prev display to clear it
    for (var i = 0; i < 3; i++) {
      var $whichMain = "#main" + i;
      $($whichMain).empty();
    }
    // Looping through each item from result
    for (var i = 0; i < 3; i++) {
      // Function creating new HTML elements
      function webcamDiv(i) {
        // Variables for finding emebd links and locations for each webcam
        var embedDay = response.result.webcams[i].player.day.embed;
        var locationCam = response.result.webcams[i].title;
        var $whichMain = "#main" + i;
        // Creating HTML elements
        var $newDiv = $("<div>");
        var $newVideo = $("<iframe>");
        var $newLocation = $("<h5>");
        // Attaching data to elements
        // Video
        $newVideo.attr("src", embedDay);
        $newVideo.attr("value", i);
        $newVideo.attr("class", "main-video")
        // Location Header
        $newLocation.text(locationCam);
        $newLocation.attr("value", i);
        $newLocation.attr("class", "main-location")
        // Appending elements
        $newDiv.append($newVideo);
        $newDiv.append($newLocation);
        $newDiv.attr("class", "feed");
        $($whichMain).append($newDiv);
      };
      webcamDiv(i);
    };
  });
};

function createMap() {
  var options = {
    center: { lat: 33.6694649, lng: -117.8231107 },
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map'), options);
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
      var position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      };
      latitudeLoc = p.coords.latitude;
      longitudeLoc = p.coords.longitude;

      infoWindow.setPosition(position);
      infoWindow.setContent('Your location!');
      infoWindow.open(map);
      map.setCenter(position);
      displayWebcam();
    }, function () {
      handleLocationError('Geolocation service failed', map.getCenter());
    });
  } else {
    handleLocationError('No geolocation available.', map.getCenter());
  }
}