const apikey = "5bda84ac9fee09cebf10c5409e55b721";

const weatherDataEle = document.querySelector(".weather-data");
const cityInputEle = document.querySelector("#city-input");
const searchBtnEle = document.querySelector("form");

const imgicon  = document.querySelector(".icon");

searchBtnEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityInputEle.value;   
    // console.log(cityValue);
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        // console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherDataEle.querySelector(".temp").textContent = `${temperature}⁰C`;
        weatherDataEle.querySelector(".dis").textContent = description;
        imgicon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}⁰C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEle.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("");

    }
    catch(error) {
        weatherDataEle.querySelector(".temp").textContent = "";
        weatherDataEle.querySelector(".dis").textContent = error.message;
        imgicon.innerHTML = "";
        weatherDataEle.querySelector(".details").innerHTML = "";
    }

}