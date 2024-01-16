const key = "6e6e40eb16f7d51c7d15623d48bfecbc"
let forecast = []
const loc = $("#search-input").val().trim()


storeHistory()

// Function to store the current search location in localStorage
function storeLocation(trueLoc){
    
    localStorage.setItem(trueLoc, trueLoc)
    storeHistory()
}

// Function to retrieve and display search history from localStorage
function storeHistory(){
    var history = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        history.push(localStorage.getItem(key));
    }

    
    printLocation(history)
}

// Function to display search history on the page
function printLocation(history){
    $("#history").empty()
    
    for(let i =0; i < history.length; i++){
        $("#history").append(`<button id="location" type="submit" class=" col-12  btn btn-secondary btn-lg my-2">${history[i]}</button>`)
    }
    
}

// Function to clear weather data from the page
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

// Function to fetch weather data from OpenWeatherMap API
function  fetchWeatherData(){
    
    // Set the weather section class to display on screen
    $("#today").attr('class', "row  border ")
    
    // Get the user's desired location from the search input
    const loc = $("#search-input").val().trim()

     // Construct the API endpoint for geocoding
    const queryGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${key}`

    // Fetch geocoding data
    fetch(queryGeocode)
    .then(function (response) {
        return response.json();
    })
    // After data comes back from the request
    .then(function (data) {
        var queryWeather
        try{ 
            console.log(data[0].lat)
            // Construct the API endpoint for weather forecast
            queryWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}&units=metric`
        }
        catch (error){
            console.error(error)
            $("#location-heading").attr("class", "text-danger")
            $("#location-heading").text("Enter a valid location")
            $("#forecast").attr('class', "row  justify-content-evenly hide")
            //return null
        }
        
        // Fetch weather forecast data
        fetch(queryWeather)
        .then(function (response) {
            return response.json();
        })
        // After data comes back from the request
        .then(function (data) {
            const currentDate = dayjs().format('DD/MM/YYYY')
            
            const trueLoc = data.city.name
            
            // Store the location in localStorage
            storeLocation(trueLoc)

            // Display the location heading
            $("#location-heading").attr("class", "")
            $("#location-heading").text(trueLoc +" - (" + currentDate + ")")
            
            // Extract forecast data for the next 5 days
            for(let i = 0; i < 5; i++){
                forecast[i] = {
                    date: data.list[i*8].dt,
                    description: data.list[i*8].weather[0].main,
                    icon: "http://openweathermap.org/img/w/" + data.list[i*8].weather[0].icon + ".png",
                    temp: data.list[i*8].main.temp,
                    wind: data.list[i*8].wind.speed,
                    humidity: data.list[i*8].main.humidity
                }
            console.log(forecast[i])
            }

            // Return the forecast data
            return forecast
        })
        .then(function (forecast) {
            $("#forecast").attr('class', "row  justify-content-evenly ")
            // Display the forecast data on the page
            for(let i = 0; i < 5; i++){
                
                $("h7").eq(i).text(dayjs.unix(forecast[i].date).format('DD/MM/YYYY'))
                $("ul").eq(i).append(`<li id = "desc" class = ""><img id = icon src = "${forecast[i].icon}" alt="Weather icon">${forecast[i].description}</li>`)
                $("ul").eq(i).append(`<li id = "temp" class = "">Temp: ${forecast[i].temp} °C</li>` )
                $("ul").eq(i).append(`<li id = "wind" class = ""> Wind: ${forecast[i].wind} MPH</li>` )
                $("ul").eq(i).append(`<li id = "humidity" class = "">Humidity: ${forecast[i].humidity} %</li>` )
            }
            
        })
    })
}


    // Event listener for the search button click
    $("#search-button").on("click",  function(e) {
        e.preventDefault()
        if(!$("#search-input").val()){
            return
        }
        clearData()
        fetchWeatherData()
    })

    // Event listener for location history button click
    $(document).on('click', "#location", function(e){
        e.preventDefault()
        console.log("test")
        $("#search-input").val($(this).text())
        clearData()
        fetchWeatherData()
    })













