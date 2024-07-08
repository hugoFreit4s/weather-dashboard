document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '80e028f5a0dde09cb3f358b23dcb1e6e';
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    const cityName = document.getElementById('cityName');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const icon = document.getElementById('icon');
    const humidity = document.getElementById('humidity');

    searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a valid city name.');
        }
    });

    async function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                updateUI(data);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {

            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data. Please try again later.');
        }
    }

    function updateUI(data) {
        const weather = data.weather[0];
        cityName.textContent = data.name;
        temp.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Description: ${weather.description}`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Weather Icon">`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
});