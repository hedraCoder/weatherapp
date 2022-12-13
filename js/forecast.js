const key = 'a447eff44523c5456fc0f62ad6533d5c';
const base = 'https://api.openweathermap.org/data/2.5/weather';


const getWeatherByCity = async (city) => {
    const query = `?q=${city}&appid=${key}&units=metric`;
    
    const response = await fetch(base + query);
    if(!response.ok && response.status === 404) {
        throw new Error('City not found ! Try again or use the location button...');
    }    
    else {
        const data = await response.json();
        return data;
    }
}

const getWeatherByLoc = async (coords) => {
    const query = `?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&units=metric`;
    const response = await fetch(base + query);  
    if(!response.ok && response.status === 404) {
        throw new Error('City not found ! Try again or use the location button...');
    }    
    else {
        const data = await response.json();
        return data;
    }
}



