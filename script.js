function getWeather(){
    const city = document.getElementById("city").value
    // alert(city)
    if (city) {
        weatherApi(city)
    } else {
        alert("City can't be empty!")
    }
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(success, error)
}
function success(cp){
    const lon = cp.coords.longitude
    const lat = cp.coords.latitude
    getCity(lon, lat)
}
async function getCity(lon, lat) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        // alert(data.address.city)
        weatherApi(data.address.city)
        document.getElementById("city").value=data.address.city

    } catch (error) {
        alert("error in api.")
    }
}
function error(){
    alert("Error fetching the location")
}

async function weatherApi(city){
    const apiKey = 'b1b15e88fa797225412429c1c50c122a1'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await fetch(url)
        const data = await response.json()
        document.getElementById("temp").innerText = `Temprature : ${data.main.temp} °C`
        document.getElementById("feels").innerText = `Feels Like : ${data.main.feels_like} °C`
        document.getElementById("humidity").innerText = `Humidity : ${data.main.humidity} %`
        document.getElementById("wind").innerText = `Wind Speed : ${data.wind.speed} km/h`
        document.getElementById("desc").innerText = `Description : ${data.weather[0].description}`

        document.getElementById("icon").src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`

    } catch (error) {
        console.log(error)
        alert(`City "${city}" can not found!`)
    }
}