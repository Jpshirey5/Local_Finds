var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var globalData = {};
var yelpData;
var radarData;
var lat;
var lng;
var radarUrl = 'https://api.radar.io/v1/search/autocomplete?query=';
var searchBtn = document.querySelector('.searchBtn');
const yelpPull = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    "Access-Control-Allow-Origin": "*", //this may be needed
    Authorization: 'Bearer JK-RqzXoJPyuvbC0_JQi-xzJH6o2Cx-3tsAEJsOZTWMstIYA93d9ydWjehbT09mEsDG_hnFb3_ooZ0Ha7_Yz-m4ICG3LcfGkcWriLAcKvFJbYyiwvqFP-NUYd0DkY3Yx'
  }
};
const radarPull = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      "Access-Control-Allow-Origin": "*", //this may be needed
      Authorization: 'prj_test_sk_ed1220433b48d0a1871616fb8d24d7a8a45a34d9'
    }
  };
var town = document.getElementsByClassName('userInput')[0];
var business = document.getElementsByClassName('userInput')[1];

//Sets the map to Orlando, Florida as default
var map = L.map('map').setView([28.5384, -81.3789], 13);

//Radar's url
var url = 'https://api.radar.io/v1/search/autocomplete?query=';

var searchBtn = document.querySelector('.searchBtn');

navigator.geolocation.getCurrentPosition(successDetectedLocation, 
    errorLocation, {
    enableHighAccuracy: true
})

function getYelp() {
    //this helps convert the search result into a url friendly input
    var townUrl = (town = '') => {
       let res = '';
       const { length } = town;
       for(let i = 0; i < length; i++){
          const char = town[i];
          if(char === ','){
            res += '%2C';
          }else if(!(char === ' ')){
             res += char;
          }else{
             res += '%20';
          }
       }
       return res;
    };
    var businessUrl = (business = '') => {
       let res = '';
       const { length } = business;
       for(let i = 0; i < length; i++){
          const char = business[i];
          if(char === ','){
            res += '%2C';
          }else if(!(char === ' ')){
             res += char;
          }else{
             res += '%20';
          }
       }
       return res;
    };

    fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?location='+townUrl(town.value)+'&term='+businessUrl(business.value)+'&sort_by=best_match&limit=20', yelpPull)
      .then(response => response.json())
      .then(function (response) {
        console.log(response)
        yelpData = response
        //can do a function does a for loop here to display the relevant data for yelpData
        //before some gets possibly overwritten by the data in radarData
        //yelpDisplay ();
        getRadar (town);
      }
      )
      .catch(err => console.error(err));
    }

function handleSearch(event) {
    event.preventDefault();

    //User input: city or place
    var cityEntered = town.value;
    var placeNearByEntered = business.value;

    if (!cityEntered && !placeNearByEntered) {
        // If the input text is invalid, show the modal with an error message
        modalMessage.innerHTML = "Please enter a city or a place to search.";
        modal.style.display = "block";
        return null;
      }

    getYelp();
    

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

function getRadar(userInput){
    var queryUrl;
    //Create queryUrl
    if (userInput){ //If city has value, but the place nearby is empty
      queryUrl = radarUrl + userInput;
    }
    
    fetch(queryUrl, radarPull)
      .then(response => response.json())
      .then(function (data) {
          //my code goes here
          console.log(data);          
          lat = yelpData.businesses[0].coordinates.latitude;
          lng = yelpData.businesses[0].coordinates.longitude;
          setUserEnteredLocation(lat, lng);

            //Below are the user tracked location
            // console.log(globalData.latitude);
            // console.log(globalData.longitude);

        })
        .catch(err => console.error(err));


}

function successDetectedLocation(position){
    console.log(position)
    map.setView([position.coords.latitude, position.coords.longitude], 13)
    placeNearBy.readOnly = false;
    placeNearBy.setAttribute('style', 'background-color: white');
    globalData.latitude = position.coords.latitude;
    globalData.longitude = position.coords.longitude;
}

function leafletClicker(){
    
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

//for loop of Displayed results can be down in this function, which executes when the search results are submitted
/*function yelpDisplay() {
    for (i < 5, yelpData.business[i], i++){

    }
}*/

searchBtn.addEventListener('click', handleSearch);