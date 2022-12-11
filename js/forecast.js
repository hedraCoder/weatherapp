const key = 'a447eff44523c5456fc0f62ad6533d5c';
const base = 'https://api.openweathermap.org/data/2.5/weather';


const getWeatherByCity = async (city) => {
    const query = `?q=${city}&appid=${key}&units=metric`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

const getWeatherByLoc = async (lat, lon) => {
    const query = `?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}



