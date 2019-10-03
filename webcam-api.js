// jQuery script for HTML:
<script
    src="https://code.jquery.com/jquery-3.4.1.js"
    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
    crossorigin="anonymous">
</script>

function displayWebcam() {
    // API URL
    var queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/country=DE?show=webcams:image,location,player";

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
                "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
                "x-rapidapi-key": "a1162ee7c6mshc800ab83c077685p1dfbd0jsn121aa30497f1"}
    }).then(function(response) {
        // Varibale creating a new div
        var $display = $("<iframe>");
        for (var i = 0; i < 10; i++) {
        // Variable for finding emebd links for each webcam
        var embedDay = response.result.webcams[i].player.lifetime.embed;
        $display.attr("src", embedDay);
        // Appending div to #main
        $("#main").append($display);
        console.log(embedDay);
        }
    }); 
};
// Calling function
displayWebcam();