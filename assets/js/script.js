var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var globalData = {};
var yelpData;
var lat;
var lng;
var searchBtn = document.querySelector('.searchBtn');
var resultsContainer = document.getElementById('results');
const yelpPull = {
method: 'GET',
headers: {
  accept: 'application/json',
  "Access-Control-Allow-Origin": "*", //this may be needed
  Authorization: 'Bearer JK-RqzXoJPyuvbC0_JQi-xzJH6o2Cx-3tsAEJsOZTWMstIYA93d9ydWjehbT09mEsDG_hnFb3_ooZ0Ha7_Yz-m4ICG3LcfGkcWriLAcKvFJbYyiwvqFP-NUYd0DkY3Yx'
}
};
var town = document.getElementsByClassName('userInput')[0];
var business = document.getElementsByClassName('userInput')[1];
//Sets the map to Orlando, Florida as default
var map = L.map('map').setView([28.5384, -81.3789], 13);
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
      yelpDisplay ();
      getLeaflet ();
    }
    )
    .catch(err => console.error(err));
  }

function handleSearch(event) {
  event.preventDefault();

  //User input: city or place
  var cityEntered = town.value;
  var placeNearByEntered = business.value;
  localStorage.setItem("cityEntered", cityEntered)
  localStorage.setItem("placeNearByEntered", placeNearByEntered)

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

function getLeaflet(){
  lat = yelpData.businesses[0].coordinates.latitude;
  lng = yelpData.businesses[0].coordinates.longitude;
  setUserEnteredLocation(lat, lng);

  for (var a = 0; a < 10; a++) {
    var tempLat = yelpData.businesses[a].coordinates.latitude;
    var tempLon = yelpData.businesses[a].coordinates.longitude;
    L.marker([tempLat, tempLon]).addTo(map);
}

  //Below are the user tracked location
  // console.log(globalData.latitude);
  // console.log(globalData.longitude);
}

function successDetectedLocation(position){
  console.log(position)
  map.setView([position.coords.latitude, position.coords.longitude], 19)
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
  map.setView([posLatitude, posLongitude], 19)
}

//for loop of Displayed results can be down in this function, which executes when the search results are submitted
//Reference: Module 6, lesson 9
function yelpDisplay() {
  var bLocation;
  bName = document.createElement('h3');
  bName.textContent = business.value;
  resultsContainer.append(bName);

  for (var i = 0; i < yelpData.businesses.length; i++) {
      bLocation = yelpData.businesses[i].location.display_address;
      bPhone = yelpData.businesses[i].phone;
      bAddress = document.createElement('li');
      bAddress.textContent = bLocation[0] + ", " + bLocation[1] + " Phone: " + bPhone;
      resultsContainer.append(bAddress);     
  }
}


searchBtn.addEventListener("click", handleSearch);
var PSearchBtn = document.querySelector(".PSearchBtn")
console.log(PSearchBtn)
PSearchBtn.addEventListener("click", function(event) {
    event.preventDefault()
    town.value = localStorage.getItem("cityEntered")
    console.log(localStorage.getItem("cityEntered"))
    business.value = localStorage.getItem("placeNearByEntered")
}

)

;
console.log(town);