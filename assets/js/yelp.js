var yelpData;
var radarData;
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
var city = "orlando"; //placeholder for user input
var place = "starbucks"; //placeholder for user input
//the following functions will take the location input and business input and run it through getYelp
//which will fetch datat from both Yelp and Radar for the relavent search inputs
function getYelp (town, business) {
fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?location='+town+'&term='+business+'&sort_by=best_match&limit=20', yelpPull)
  .then(response => response.json())
  .then(function (response) {
    console.log(response)
    yelpData = response
    var radarLong = yelpData.businesses[0].coordinates.longitude.toString();
    var radarLat = yelpData.businesses[0].coordinates.latitude.toString();
    var brand = business.toString();
    getRadar (brand, radarLat, radarLong)
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

getYelp (city, place)