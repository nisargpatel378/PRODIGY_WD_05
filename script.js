const apiKey = 'YOUR_API_TOKEN';

function fetchWeather() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        displayModal('Please enter a location.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                displayModal(data.message);
                return;
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayModal('Failed to fetch weather data. Please try again later.');
        });
}

function displayWeather(data) {
    const weatherPanel = document.getElementById('weatherPanel');
    document.getElementById('location').textContent = data.name;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherPanel.style.display = 'block';
}

function displayModal(message) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    modalText.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod !== 200) {
                        displayModal(data.message);
                        return;
                    }
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    displayModal('Failed to fetch weather data. Please try again later.');
                });
        });
    } else {
        displayModal('Geolocation is not supported by this browser.');
    }
}

window.onload = fetchWeatherByLocation;
