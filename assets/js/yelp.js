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

var city = "Orlando"; //placeholder for user input
var place = "Starbucks"; //placeholder for user input

fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?location='+city+'&term='+place+'&sort_by=best_match&limit=20', yelpPull)
  .then(response => response.json())
  .then(function (response) {
    console.log(response)
    yelpData = response
    var radarLat = yelpData.businesses[0].coordinates.latitude;
    console.log(radarLat);
  }
  )
  .catch(err => console.error(err));
/*
  console.log(yelpData);
  var radarLat = yelpData.businesses[0].coordinates.latitude;
  var radarLong;
  

const radarPull = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    "Access-Control-Allow-Origin": "*", //this may be needed
    Authorization: 'prj_test_sk_ed1220433b48d0a1871616fb8d24d7a8a45a34d9'
  }
};

fetch('https://api.radar.io/v1/search/autocomplete?query='+city, radarPull)
  .then(response => response.json())
  .then(function (response) {
    console.log(response)
    radarData = response
  }
  )
  .catch(err => console.error(err));
  */