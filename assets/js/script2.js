const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      "Access-Control-Allow-Origin" : "*", //this may be needed
      Authorization: 'prj_test_sk_ed1220433b48d0a1871616fb8d24d7a8a45a34d9'
    }
  };

var city = "Orlando"; //placeholder for user input
var place = "Starbucks"; //placeholder for user input

  fetch('https://api.radar.io/v1/search/autocomplete?query='+city, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));