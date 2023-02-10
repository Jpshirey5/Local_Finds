var yelpData;
var radarData;
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
//var city = "Orlando"; //placeholder for user input
//var place = "Starbucks"; //placeholder for user input



//the following functions will take the location input and business input and run it through getYelp
//which will fetch datat from both Yelp and Radar for the relavent search inputs
//function getYelp (event) {
function getYelp () {
//const town = "Orlando"; //placeholder for user input
//const business = "Starbucks"; //placeholder for user input

//  var town = document.getElementsByClassName('userInput')[0].value.trim();
//  var business = document.getElementsByClassName('userInput')[1].value.trim();
var town = "San Francisco, CA";
var business = "Best Buy";

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

console.log(townUrl(town));
console.log(businessUrl(business));

var townLink = townUrl(town);
var businessLink = businessUrl(business);
  //The two variables for 'town' and 'business' need to be trimmed beforehand and then put through a
  //for loop to turn both variables into strings where each character is a variable within a string
  //so we can convert spaces and commas into %20 and %2C, and then make them into singular variables
  //again before being put into the fetch
  fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?location='+townLink+'&term='+businessLink+'&sort_by=best_match&limit=20', yelpPull)
  .then(response => response.json())
  .then(function (response) {
    console.log(response)
    yelpData = response
    var radarLong = yelpData.businesses[0].coordinates.longitude.toString();
    var radarLat = yelpData.businesses[0].coordinates.latitude.toString();
    var brand = business.toString();
    getRadar (brand, radarLat, radarLong);
  }
  )
  .catch(err => console.error(err));
}
  
function getRadar (company, xCord, yCord) { //I'm trying to figure out how to get the values from getYelp to work in here
fetch('https://api.radar.io/v1/search/places?chains='+company+'&near='+xCord+'%2C'+yCord+'&radius=10000', radarPull)
  .then(response => response.json())
  .then(function (response) {
    console.log(response)
    radarData = response
  }
  )
  .catch(err => console.error(err));
}

//searchBtn.addEventListener('submit', getYelp);
getYelp ();