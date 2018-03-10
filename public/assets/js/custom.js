(function(window, google) {

    //map options

    var options = {
            center: {
                lat: 6.465422,
                lng: 3.406448,
            },
            zoom: 10,
            maxZoom: 12,
            minZoom: 9,
        },


        element = document.getElementById('map-canvas'),

        //map
        map = new google.maps.Map(element, options);

}(window, google));

// function initMap() {
//     var uluru = { lat: 6.465422, lng: 3.406448 };
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 10,
//         center: uluru
//     });
//     var marker = new google.maps.Marker({
//         position: uluru,
//         map: map
//     });
// }


//twitter API

$("#tweet").on('click', function() {
    var url = "https://twitter.com/intent/tweet";
    var text = "\" " + document.getElementById("textss").textContent + "\" " + document.getElementById("name").textContent;
    var hashtags = "Quotes";
    window.open(url + "?text=" + text + ";hashtags =" + hashtags, "width=500,height=300");

});
