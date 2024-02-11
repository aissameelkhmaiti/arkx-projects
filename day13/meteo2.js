const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
];

// Function to select a random city from the list
function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
}

// Function to fetch temperature data for a selected city
async function fetchDataTemperatureByCity(selectedCity) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current_weather=true`;

    try {
        // Fetch data from the API
        const data = await fetch(apiUrl);

        // Parse the JSON response
        const response = await data.json();

        // Check if the response is valid
        if (response && response.current_weather) {
            // Extract temperature from the response
            const temperature = response.current_weather.temperature;

            // Display the city name and temperature to the user
            console.log(`The temperature in ${selectedCity.name} is ${temperature}°C`);
        } else {
            // Handle error if the response is not as expected
            throw new Error(`Error fetching temperature data for ${selectedCity.name}`);
        }
    } catch (error) {
        // Handle any errors that occurred during the fetch or processing
        console.error('Error:', error.message);
        throw error;
    }
}

// Call the functions to select a random city and fetch temperature data
const selectedCity = selectRandomCity(cities);
fetchDataTemperatureByCity(selectedCity);
