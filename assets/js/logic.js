const key = "6e6e40eb16f7d51c7d15623d48bfecbc"
let forecast = []
let onScreen = false
const loc = $("#search-input").val().trim()


function storeLocation(trueLoc){
    
    localStorage.setItem(trueLoc, trueLoc)
    storeHistory()
}

function storeHistory(){
    var history = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        history.push(localStorage.getItem(key));
    }

    
    printLocation(history)
}

function printLocation(history){
    $("#history").empty()
    
    for(let i =0; i < history.length; i++){
        $("#history").append(`<button type="button" class=" col-12  btn btn-secondary btn-lg my-2" id="location">${history[i]}</button>`)

    }
}
function clearData(){
    
    $("#location-heading").text("")
    for(let i = 0; i < 5; i++){
        $("ul").eq(i).empty()
        $("ul").eq(i).empty()
        $("ul").eq(i).empty()
        $("ul").eq(i).empty()
        $("ul").eq(i).empty()
    }
}

function  fetchWeatherData(){
    
    $("#weather-section").attr('class', "col-md-9 ")
    
    const loc = $("#search-input").val().trim()
    const queryGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${key}`

    fetch(queryGeocode)
    .then(function (response) {
        return response.json();
    })
    // After data comes back from the request
    .then(function (data) {
        const queryWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`
        
        
        fetch(queryWeather)
        .then(function (response) {
            return response.json();
        })
        // After data comes back from the request
        .then(function (data) {
            const currentDate = dayjs().format('DD/MM/YYYY')
            //console.log(data)
            const trueLoc = data.city.name
            storeLocation(trueLoc)
            $("#location-heading").text(trueLoc +" - (" + currentDate + ")")
            
            for(let i = 0; i < 5; i++){
                forecast[i] = {
                    description: data.list[i*8].weather[0].main,
                    icon: "http://openweathermap.org/img/w/" + data.list[i*8].weather[0].icon + ".png",
                    temp: data.list[i*8].main.temp,
                    wind: data.list[i*8].wind.speed,
                    humidity: data.list[i*8].main.humidity
                }
            }
            return forecast
        })
        .then(function (forecast) {
            
            for(let i = 0; i < 5; i++){
                console.log(forecast[i].humidity)
                $("ul").eq(i).append(`<li id = "desc" class = ""><img id = icon src = "${forecast[i].icon}" alt="Weather icon">${forecast[i].description}</li>`)
                $("ul").eq(i).append(`<li id = "temp" class = "">Temp: ${forecast[i].temp}</li>` )
                $("ul").eq(i).append(`<li id = "wind" class = ""> Wind: ${forecast[i].wind}</li>` )
                $("ul").eq(i).append(`<li id = "humidity" class = "">Humidity: ${forecast[i].humidity}</li>` )
            }
            onScreen = true
        })
    })
}

$(document).ready(function(){
    storeHistory()

    $("#location").on("click", function(e) {
        e.preventDefault()
        console.log("test")
        const loc = $("#search-input").val($(this).attr('id'))
        clearData()
        
        fetchWeatherData()
    })
})

$("#search-button").on("click",  function(e) {
    
    clearData()
    e.preventDefault()
    fetchWeatherData()
})



