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
var town = document.getElementsByClassName('userInput')[0];
var business = document.getElementsByClassName('userInput')[1];
//
//the following functions will take the location and business input and run it through getYelp
//which will fetch datat from both Yelp and Radar for the relevant search inputs
function getYelp (event) {
event.preventDefault();
/*
var townName = town.value;
var businessName =business.value;
console.log(townName);
console.log(businessName);
*/

//The following two functions make the user inputs url friendly
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
console.log(townUrl(town.value));
console.log(businessUrl(business.value));
//return;

fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?location='+townUrl(town.value)+'&term='+businessUrl(business.value)+'&sort_by=best_match&limit=20', yelpPull)
  .then(response => response.json())
  .then(function (response) {
    console.log(response)
    yelpData = response
    var brand = business.toString();
    var radarLong = yelpData.businesses[0].coordinates.longitude.toString();
    var radarLat = yelpData.businesses[0].coordinates.latitude.toString();
    //can do a function does a for loop here to display the relevant data for yelpData
    //before some gets possibly overwritten by the data in radarData
    yelpDisplay ();
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
    //as mentioned in line 76 for yelpData we can do a for loop here to
    //display the data for radarData if need be

  }
  )
  .catch(err => console.error(err));
}

function yelpDisplay() {

}

searchBtn.addEventListener('click', getYelp);
//getYelp (city, place);