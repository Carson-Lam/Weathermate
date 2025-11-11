let isCelsius = true;

// Disable button until data is fetched
document.querySelector("#tempToggle").disabled = true;


// function showPopup() {
//     if (!localStorage.getItem('popupSeen')) {
//         document.querySelector(".popup").style.display = "flex";
//     } else {
//         document.querySelector(".popup").style.display = "none";
//     }
// }

async function fetchData() {
    if (!navigator.geolocation) {
        cityOutput.textContent = "Geolocation fetching failed";
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
                try {
                    document.querySelector("#tempToggle").disabled = false;
                    const {
                        longitude,
                        latitude
                    } = position.coords;
                    const res = await fetch(`https://weathermate-pr27.onrender.com/weather?lat=${latitude}&lon=${longitude}`);
                    const record = await res.json();
                    const tempElement = document.getElementById("temp");
                    const maxTempElement = document.getElementById("maxtemp");
                    const minTempElement = document.getElementById("mintemp");

                    // Store UNROUNDED temperatures in Celsius as HTML data attributes
                    tempElement.dataset.Celsius = record.main.temp;
                    maxTempElement.dataset.Celsius = record.main.temp_max;
                    minTempElement.dataset.Celsius = record.main.temp_min;

                    document.getElementById("cityDisplay").innerHTML = record.name;
                    document.getElementById("weather").innerHTML = record.weather[0].main;
                    tempElement.innerHTML = parseFloat(tempElement.dataset.Celsius).toFixed(1);
                    maxTempElement.innerHTML = parseFloat(maxTempElement.dataset.Celsius).toFixed(1);
                    minTempElement.innerHTML = parseFloat(minTempElement.dataset.Celsius).toFixed(1);

                    if (record.weather[0].main === "Thunderstorm") {
                        document.getElementById("weatherSprite").src = "images/ThunderySprite.png";
                    } else if (record.weather[0].main === "Drizzle" || record.weather[0].main === "Rain") {
                        document.getElementById("weatherSprite").src = "images/RainySprite.png";
                    } else if (record.weather[0].main === "Snow") {
                        document.getElementById("weatherSprite").src = "images/SnowySprite.png";
                    } else if (record.weather[0].main === "Clear") {
                        document.getElementById("weatherSprite").src = "images/SunnySprite.png";
                    } else if (record.weather[0].main === "Clouds") {
                        document.getElementById("weatherSprite").src = "images/CloudySprite.png";
                    } else {
                        document.getElementById("weatherSprite").src = "images/MistySprite.png";
                    }
                } catch (error) {
                    alert("Could not fetch weather data for your location!")
                    document.querySelector("#tempToggle").disabled = true;
                    document.getElementById("cityDisplay").innerHTML = "...";
                    document.getElementById("weather").innerHTML = "...";
                    document.getElementById("temp").innerHTML = "...";
                    document.getElementById("maxtemp").innerHTML = "...";
                    document.getElementById("mintemp").innerHTML = "...";
                    document.getElementById("weatherSprite").src = "images/WeatherMateIcon.png";
                    console.error("There was an error fetching the weather data:", error);
                }
            },
            (error) => {
                cityOutput.textContent = `Error: ${error.message}`;
            });

    document.getElementById("weatherForm").addEventListener("submit", async function (event) {
            try {
                document.querySelector("#tempToggle").disabled = false;
                event.preventDefault();
                const city = document.getElementById('city').value;

                if (!city) {
                    return; // Do nothing if empty
                }

                const res = await fetch(`https://weathermate-pr27.onrender.com/weather?city=${city}`);
                const record = await res.json();
                const tempElement = document.getElementById("temp");
                const maxTempElement = document.getElementById("maxtemp");
                const minTempElement = document.getElementById("mintemp");

                // Store temperatures in Celsius as HTML data attributes
                tempElement.dataset.Celsius = record.main.temp;
                maxTempElement.dataset.Celsius = record.main.temp_max;
                minTempElement.dataset.Celsius = record.main.temp_min;

                document.getElementById("cityDisplay").innerHTML = record.name;
                document.getElementById("weather").innerHTML = record.weather[0].main;
                tempElement.innerHTML = parseFloat(tempElement.dataset.Celsius).toFixed(1);
                maxTempElement.innerHTML = parseFloat(maxTempElement.dataset.Celsius).toFixed(1);
                minTempElement.innerHTML = parseFloat(minTempElement.dataset.Celsius).toFixed(1);

                if (record.weather[0].main === "Thunderstorm") {
                    document.getElementById("weatherSprite").src = "ThunderySprite.png";
                } else if (record.weather[0].main === "Drizzle" || record.weather[0].main === "Rain") {
                    document.getElementById("weatherSprite").src = "images/RainySprite.png";
                } else if (record.weather[0].main === "Snow") {
                    document.getElementById("weatherSprite").src = "images/SnowySprite.png";
                } else if (record.weather[0].main === "Clear") {
                    document.getElementById("weatherSprite").src = "images/SunnySprite.png";
                } else if (record.weather[0].main === "Clouds") {
                    document.getElementById("weatherSprite").src = "images/CloudySprite.png";
                } else {
                    document.getElementById("weatherSprite").src = "images/MistySprite.png";
                }

            } catch (error) {
                alert("Could not fetch weather data for entered city!")
                document.querySelector("#tempToggle").disabled = true;
                document.getElementById("cityDisplay").innerHTML = "...";
                document.getElementById("weather").innerHTML = "...";
                document.getElementById("temp").innerHTML = "...";
                document.getElementById("maxtemp").innerHTML = "...";
                document.getElementById("mintemp").innerHTML = "...";
                document.getElementById("weatherSprite").src = "images/WeatherMateIcon.png";
                console.error("There was an error fetching the weather data:", error);
            }
        },
        (error) => {
            cityOutput.textContent = `Error: ${error.message}`;
        });
}

function updateTemps() {
    const tempElement = document.getElementById("temp");
    const maxTempElement = document.getElementById("maxtemp");
    const minTempElement = document.getElementById("mintemp");

    const tempC = parseFloat(tempElement.dataset.Celsius);
    const maxTempC = parseFloat(maxTempElement.dataset.Celsius);
    const minTempC = parseFloat(minTempElement.dataset.Celsius);

    if (isCelsius) {
        tempElement.innerHTML = tempC.toFixed(1);
        maxTempElement.innerHTML = maxTempC.toFixed(1);
        minTempElement.innerHTML = minTempC.toFixed(1);
    } else {
        tempElement.innerHTML = (tempC * 9 / 5 + 32).toFixed(1);
        maxTempElement.innerHTML = (maxTempC * 9 / 5 + 32).toFixed(1);
        minTempElement.innerHTML = (minTempC * 9 / 5 + 32).toFixed(1);
    }
}

// document.querySelector("#close").addEventListener("click", function () {
//     document.querySelector(".popup").style.display = "none";
//     localStorage.setItem('popupSeen', 'true');
// });

document.querySelector("#tempToggle").addEventListener("click", function () {
    isCelsius = !isCelsius;
    this.textContent = isCelsius ? "°C" : "°F";
    updateTemps();
});

fetchData();
// showPopup();