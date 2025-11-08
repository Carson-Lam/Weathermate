function showPopup(){
    if (!localStorage.getItem('popupSeen')) {
        document.querySelector(".popup").style.display = "flex";
    } else {   
        document.querySelector(".popup").style.display = "none";
    }
} 

async function fetchData() {
    // window.addEventListener("load",() =>  {
        if (!navigator.geolocation){
            cityOutput.textContent="Geolocation fetching failed";
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {longitude, latitude} = position.coords;
                const res = await fetch(`https://weathermate-pr27.onrender.com/weather?lat=${latitude}&lon=${longitude}`);
                const record = await res.json();
                document.getElementById("cityDisplay").innerHTML = record.name;
                document.getElementById("weather").innerHTML = record.weather[0].main;
                document.getElementById("temp").innerHTML = record.main.temp;
                document.getElementById("maxtemp").innerHTML = record.main.temp_max;
                document.getElementById("mintemp").innerHTML = record.main.temp_min;
                
                if (record.weather[0].main === "Thunderstorm") {
                    document.getElementById("weatherSprite").src = "images/ThunderstormSprite.png";
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

            },
            (error) => {
                cityOutput.textContent = `Error: ${error.message}`;
            }
        )

    // });

    document.getElementById("weatherForm").addEventListener("submit", async function (event) {
        try {
            event.preventDefault();
            const city = document.getElementById('city').value;
            const res = await fetch(`https://weathermate-pr27.onrender.com/weather?city=${city}`);
            const record = await res.json();
            document.getElementById("cityDisplay").innerHTML = record.name;
            document.getElementById("weather").innerHTML = record.weather[0].main;
            document.getElementById("temp").innerHTML = record.main.temp;
            document.getElementById("maxtemp").innerHTML = record.main.temp_max;
            document.getElementById("mintemp").innerHTML = record.main.temp_min;

            if (record.weather[0].main === "Thunderstorm") {
                document.getElementById("weatherSprite").src = "images/ThunderstormSprite.png";
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
            document.getElementById("cityDisplay").innerHTML = " ";
            document.getElementById("weather").innerHTML = " ";
            document.getElementById("temp").innerHTML = " ";
            document.getElementById("maxtemp").innerHTML = " ";
            document.getElementById("mintemp").innerHTML = " ";
            console.error("There was an error fetching the weather data:", error);
        }
    }, 
    (error) => {
        cityOutput.textContent = `Error: ${error.message}`;
    }

);
}
fetchData();

document.querySelector("#close").addEventListener("click", function() {
    document.querySelector(".popup").style.display = "none";
    localStorage.setItem('popupSeen', 'true');
});


showPopup();