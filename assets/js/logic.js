const key = "6e6e40eb16f7d51c7d15623d48bfecbc"
let forecast = []



function  fetchWeatherData(){

    loc = $("#search-input").val().trim()
    const queryGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=${key}`
    
    
    fetch(queryGeocode)
    .then(function (response) {
        return response.json();
    })
    // After data comes back from the request
    .then(function (data) {
        const queryWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}`
        console.log(data);
        //const queryWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${key}`
        
        fetch(queryWeather)
        .then(function (response) {
            return response.json();
        })
        // After data comes back from the request
        .then(function (data) {
            const currentDate = dayjs().format('DD/MM/YYYY')
            console.log(data)
            //console.log(data.list[0].weather[0].main)
            
            $("#location-heading").text(data.city.name +" - (" + currentDate + ")")
            
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
            console.log(forecast[0].description)
            //$("#desc").text("src", )
            // $("#icon").attr()
            // $("#temp").text("Temp: " + )
            // $("#wind").text("Wind Speed: " + )
            // $("#humidity").text("Humidity: " + )

            $("#firstDay").text(dayjs().day(dayjs().day()+1).format('DD/MM/YYYY'))
            $("#secondDay").text(dayjs().day(dayjs().day()+2).format('DD/MM/YYYY'))
            $("#thirdDay").text(dayjs().day(dayjs().day()+3).format('DD/MM/YYYY'))
            $("#fourthDay").text(dayjs().day(dayjs().day()+4).format('DD/MM/YYYY'))
            $("#fifthDay").text(dayjs().day(dayjs().day()+5).format('DD/MM/YYYY'))
            
            
        })
    })

}



$("#search-button").on("click", function(e) {
    
    e.preventDefault()
    fetchWeatherData()
    
})

