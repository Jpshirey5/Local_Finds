var apiKey = 'Authorization: prj_test_sk_ed1220433b48d0a1871616fb8d24d7a8a45a34d9';
var url = 'https://api.radar.io/v1/search/autocomplete?query=';
var searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var valueEntered = document.querySelector('.userInput').value;

    if (!userInput) {
        // Nothing happens if the user doesn't enter information
        return null;
    } 

    getApi(valueEntered);

}

function getApi(userInput){

    //Get the url
    var queryString = url + userInput + apiKey;

    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                // window.alert('Not a valid city');
                throw new Error('Network response was not ok'); //response.json();
            }
            return response.json();
        })
        .then(function (data) {
            //if fetch was successful
            console.log("Fetch work");

        })
        .catch(error => {
            console.error('There was a problem:', error);
        });

}