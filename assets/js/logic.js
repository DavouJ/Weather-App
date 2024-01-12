const key = "6e6e40eb16f7d51c7d15623d48bfecbc"
var getLat = null
var getLon = null
var loc = null

const queryWeather = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${key}`

function fetchGeocode(){

    loc = $("#search-input").val().trim()
    const queryGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${key}`
    
    
    fetch(queryGeocode)
        .then(function (response) {
            return response.json();
        })
        // After data comes back from the request
        .then(function (data) {
            console.log(data);
            getLat = data[0].lat
            getLon = data[0].lon
        })

}

function fetchWeatherData(){
    const queryWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${getLat}&lon=${getLon}&appid=${key}`

    fetch(queryWeather)
        .then(function (response) {
            return response.json();
        })
        // After data comes back from the request
        .then(function (data) {
            console.log(data);
        })

}




$("#search-button").on("click", function(e) {
    console.log("test")
    e.preventDefault()
    fetchGeocode()
    fetchWeatherData()
})

