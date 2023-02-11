//const Radar = require('radar-sdk-js');

var apiKey = 'prj_test_sk_ed1220433b48d0a1871616fb8d24d7a8a45a34d9';
var url = 'https://api.radar.io/v1/search/autocomplete?query=';
var searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', handleSearch);

function handleSearch(event) {
    event.preventDefault();

    var valueEntered = document.querySelector('.userInput').value;
    console.log(valueEntered);
    console.log(typeof(valueEntered));

    if (!valueEntered) {
        // Nothing happens if the user doesn't enter information
        return null;
    }
    getApi(valueEntered);

}

function getApi(userInput){

    console.log(typeof(userInput));

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin" : "*", //this may be needed
          Authorization: apiKey
        }
      };

      var queryUrl = url+userInput;
      fetch(queryUrl, options)
        .then(response => response.json())
        .then(function (data) {
            //my code goes here
            console.log(data);
            var lat = data.addresses[0].latitude;
            var lng = data.addresses[0].longitude;
            console.log(lat + ' ' + lng);

            var geofence = 'https://api.radar.io/v1/search/geofences?near=28.606464,-81.5235072'// + lat + ',' + lng;
            console.log('geofence ' + geofence);
            console.log(options);

            fetch(geofence, options)
                .then(response => response.json())
                .then(function (geoData) {
                    console.log(geoData);
                })
                .catch(err => console.error(err));

        })
        .catch(err => console.error(err));

    


    // var map = new radar.maps.Map('map', {
    //     center: { lat: 37.7749, lng: -122.4194 },
    //     zoom: 12,
    //     accessToken: apiKey
    //     });

    // var mapDiv = document.getElementById('map');

    // var map = new window.Radar.Map({
    //     container: mapDiv,
    //     style: queryUrl+apiKey,
    //     center: [0,0],
    //     zoom: 3
    // });

}