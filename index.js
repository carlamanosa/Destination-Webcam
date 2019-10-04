//----------------------------------------------------------------------------------------------------------------//
//                                           Webcam Display Stuff
//----------------------------------------------------------------------------------------------------------------//


// Function for displaying webcam feeds
function displayWebcam() {
  // API URL
  var queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/country=US?show=webcams:player";

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
      // Looping through each item from result
      for (var i = 0; i < 3; i++) {
          // Function creating new HTML elements
          function webcamDiv(i) {
              // Variables for finding emebd links and locations for each webcam
              var embedDay = response.result.webcams[i].player.day.embed;
              var locationCam = response.result.webcams[i].title;
              var locationCamJSON = JSON.stringify(locationCam);
              // Creating HTML elements
              var $newDiv = $("<div>");
              var $newVideo = $("<iframe>");
              var $newLocation = $("<h3>");
              // Attaching data to elements
              // Video
              $newVideo.attr("src", embedDay);
              $newVideo.attr("value", i);
              $newVideo.attr("class", "main-video")
              // Location Header
              $newLocation.text(locationCamJSON);
              $newLocation.attr("value", i);
              $newLocation.attr("class", "main-location")
              // Appending elements
              $newDiv.append($newVideo);
              $newDiv.append($newLocation);
              $newDiv.attr("class", "col s12 m4 feed");
              $("#main").append($newDiv);
          };
          webcamDiv(i);
      };
  }); 
};
// Calling function
$("#begin").on("click", displayWebcam);









//----------------------------------------------------------------------------------------------------------------//
//                                           Google Maps Stuff
//----------------------------------------------------------------------------------------------------------------//

var map;
  geocode();

  function geocode() {
      var location = "2008 Thackery st, West Covina, CA";

      var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?";

      var queryParams = $.param({
          address:location,
          key: 'AIzaSyAMGnVG45Aa7TXiqBhficDiazh-Sjprmeg'
      })
  
      $.ajax({
          url: queryURL + queryParams,
          method: "GET"
      }).then(function (response) {
          console.log(response);
          var latitudeLoc = response.results[0].geometry.location.lat;
          var longitudeLoc = response.results[0].geometry.location.lng;
          console.log(latitudeLoc);
          console.log(longitudeLoc);

      })
  }










//----------------------------------------------------------------------------------------------------------------//
//                                           Other Stuff
//----------------------------------------------------------------------------------------------------------------//








