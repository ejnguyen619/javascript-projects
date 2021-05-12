window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let locationIcon = document.querySelector('.weather-icon');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;

            // Fetch data from api and output on screen
            fetch(api)
              .then(response => {
                return response.json();
              })
              .then(data => {
                console.log(data);
                const {feels_like} = data.main;
                const {description} = data.weather[0];
                const {icon} = data.weather[0];

                // Convert to Fahrenheit
                const fahrenheit = celsius => {
                    return (9/5)*celsius + 32;
                };

                // Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(fahrenheit(feels_like));
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name;
                locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

                // Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', ()=> {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = feels_like;
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(fahrenheit(feels_like));   
                    }
                });
            });
        });
    }
});