
$(document).ready(function () {

//----------------------------------------------------------------------------------------------------------------//
//                                           Webcam Display Stuff
//----------------------------------------------------------------------------------------------------------------//


// Function for displaying webcam feeds
function displayWebcam() {
  // API URL
  var queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/nearby="+latitudeLoc+","+longitudeLoc+",50/orderby=popularity?show=webcams:player";

  // Requesting data from webcam.travel API
  $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
            "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
            "x-rapidapi-key": "a1162ee7c6mshc800ab83c077685p1dfbd0jsn121aa30497f1"}
  }).then(function(response) {
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
              $newDiv.append($newVideo);
              $newDiv.attr("class", "feed");
              $($whichMain).append($newDiv);
          };
          webcamDiv(i);
      };
  }); 
};
// Calling function
$("#begin").on("click", displayWebcam);


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
            "x-rapidapi-key": "a1162ee7c6mshc800ab83c077685p1dfbd0jsn121aa30497f1"}
  }).then(function(response) {
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
              $newDiv.append($newVideo);
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

var latitudeLoc;
var longitudeLoc;
var queryURL = "https://maps.googleapis.com/api/geocode/json?";
// var queryParams = $.params({
//   geometry:
// })
$.ajax({
 url: queryURL,
 method: "GET"
}).then(function (response) {
 console.log(response);
 console.log(response.results[0].geometry.lat);
 console.log(response.results[0].geometry.lng);
});
var map;
var infoWindow;
 geocode();
 function geocode() {
     var location = "2008 Thackery st, West Covina, CA";
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
         latitudeLoc = response.results[0].geometry.location.lat;
         longitudeLoc = response.results[0].geometry.location.lng;
         console.log(latitudeLoc);
         console.log(longitudeLoc);
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
  }









//----------------------------------------------------------------------------------------------------------------//
//                                           Other Stuff
//----------------------------------------------------------------------------------------------------------------//
  
// Parallax Initialize
$("#begin").on("click", function() {
  console.log("openDisplay() called");
  $("#start-section").attr("style", "display: none;");
  $("#main-container").show("scroll", "#main-display");  
});

$('.parallax').parallax();

// Scrollspy Initialize
$('.scrollspy').scrollSpy();







  
})