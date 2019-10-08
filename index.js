
$(document).ready(function () {

  //----------------------------------------------------------------------------------------------------------------//
  //                                           Webcam Display Markers Stuff
  //----------------------------------------------------------------------------------------------------------------//


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
      
      //deleteMarkers();
      // Looping through each item from result
      for (var i = 0; i < 3; i++) {
        //Adding Locations of webcam feeds into camMarker array
        camMarkers.push(response.result.webcams[i].title);
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
      
      //displayMarkers(camMarkers);
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
      console.log(latitudeLoc);
      console.log(longitudeLoc);

      infoWindow.setPosition(position);
      infoWindow.setContent('Geocode location!');
      infoWindow.open(map);
      map.setCenter(position);
      displayWebcam();
    })
  }

  $("#submit").on("click", function () {
    geocode($("#address").val());
  })

  //----------------------------------------------------------------------------------------------------------------//
  //                                           Other Stuff
  //----------------------------------------------------------------------------------------------------------------//

  // Parallax Initialize


});

var map;
var infoWindow;
var latitudeLoc;
var longitudeLoc;
var camMarkers = [];

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
    
    //deleteMarkers();
    // Looping through each item from result
    for (var i = 0; i < 3; i++) {
      //Adding Locations of webcam feeds into camMarker array
      camMarkers.push(response.result.webcams[i].title);
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
    //displayMarkers(camMarkers);

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

// 

//ONLY NEEDS LAT AND LONG VALUES IN ARR INSTEAD OF STRING

// Sets the map on all markers in the array.
// function setMapOnAll(map) {
//   for (var i = 0; i < camMarkers.length; i++) {
//       camMarkers[i].setMap(map);
//   }
// }

// // Removes the markers from the map, but keeps them in the array.
// function clearMarkers() {
//   setMapOnAll(null);
// }

// // Deletes all markers in the array by removing references to them.
// function deleteMarkers() {
//   clearMarkers();
//   camMarkers = [];
// }

// //geolocation()?

// function displayMarkers(arr) {
//   console.log(arr);
//   for (var i = 0; i < arr.length; i++) {
//       var arr = arr[i];
//       generateMarker(arr);
//   }
// }
// function generateMarker(arr) {
//   var marker = new google.maps.Marker({
//       position: arr.geometry.location,
//       map: map,
//       title: arr.name
//   });
//   camMarkers.push(marker);
// }

// // Shows any markers currently in the array.
// function showMarkers() {
//   setMapOnAll(map);
// }