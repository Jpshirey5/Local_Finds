var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var globalData = {};

//Sets the map to Orlando, Florida as default
var map = L.map('map').setView([28.5384, -81.3789], 13);

//Radar's Api Key
var apiKey = 'prj_test_sk_ed1220433b48d0a1871616fb8d24d7a8a45a34d9';

//Radar's url
var url = 'https://api.radar.io/v1/search/autocomplete?query=';
var url2 = 'https://api.radar.io/v1/search/autocomplete?query=';
var searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', handleSearch);

function handleSearch(event) {
    event.preventDefault();

    //User input: city or place
    var cityEntered = document.querySelectorAll('.userInput')[0].value;
    var placeNearByEntered = document.querySelectorAll('.userInput')[1].value;

    if (!cityEntered && !placeNearByEntered) {
        // If the input text is invalid, show the modal with an error message
        modalMessage.innerHTML = "Please enter a city or a place to search.";
        modal.style.display = "block";
        return null;
      }

    getApi(cityEntered, placeNearByEntered);

}

//Once user clicks screen the window with error message hides
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function getApi(userInput, userInput2){

    //Radar.com gets the place or city's coordinates that will be displayed in the map
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin" : "*",
          Authorization: apiKey
        }
      };

      var queryUrl;
      //Create queryUrl
      if (userInput){ //If city has value, but the place nearby is empty
        queryUrl = url + userInput;
      }
      
      fetch(queryUrl, options)
        .then(response => response.json())
        .then(function (data) {
            //my code goes here
            console.log(data);
            var lat = data.addresses[0].latitude;
            var lng = data.addresses[0].longitude;
            
            setUserEnteredLocation(lat, lng);

            var geofence = 'https://api.radar.io/v1/search/geofences?near=28.606464,-81.5235072'// + lat + ',' + lng;
            console.log('geofence ' + geofence);
            console.log(options);

            var placeNearBy = document.getElementById('placeNearBy');
            placeNearBy.readOnly = false;
            placeNearBy.setAttribute('style', 'background-color: white');

            //Below are the user tracked location
            // console.log(globalData.latitude);
            // console.log(globalData.longitude);

        })
        .catch(err => console.error(err));


}

navigator.geolocation.getCurrentPosition(successDetectedLocation, 
    errorLocation, {
    enableHighAccuracy: true
})

function successDetectedLocation(position){
    console.log(position)
    map.setView([position.coords.latitude, position.coords.longitude], 13)
    placeNearBy.readOnly = false;
    placeNearBy.setAttribute('style', 'background-color: white');
    globalData.latitude = position.coords.latitude;
    globalData.longitude = position.coords.longitude;
}

function errorLocation(){
    console.log('User does not allow to track their location')
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function setUserEnteredLocation(posLatitude, posLongitude){
    map.setView([posLatitude, posLongitude], 13)
}