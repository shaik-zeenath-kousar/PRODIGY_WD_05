const apiKey = 'a645c5d51987f7129003e9fd30152830'; // Replace with your OpenWeatherMap API key

const weatherDetails = document.getElementById('weather-details');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityInput = document.getElementById('city-input');

// Fetch weather data by city name
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found. Please check the name and try again.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDetails.textContent = `Error: ${error.message}`;
    }
}

// Fetch weather data by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Unable to fetch weather data.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDetails.textContent = `Error: ${error.message}`;
    }
}

// Display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    weatherDetails.innerHTML = `
        <h3 class="text-xl font-bold">${name}</h3>
        <p class="text-gray-700">Temperature: ${main.temp}°C</p>
        <p class="text-gray-700">Feels Like: ${main.feels_like}°C</p>
        <p class="text-gray-700">Condition: ${weather[0].description}</p>
        <p class="text-gray-700">Humidity: ${main.humidity}%</p>
    `;
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        weatherDetails.textContent = 'Please enter a city name.';
    }
});

// Event listener for location button
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                weatherDetails.textContent = `Error: ${error.message}`;
            }
        );
    } else {
        weatherDetails.textContent = 'Geolocation is not supported by your browser.';
    }
});
