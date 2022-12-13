const weatherForm = document.querySelector('.widget-form');
const locationButton = document.querySelector('.btn-location');
const card = document.querySelector('.widget-card');
const close = document.querySelector('.widget-card-close');
const widget = document.querySelector('.widget-data');
const loadingTemplate = `<div class="widget-message text-center">
                            <div class="icon-wait">
                                <img src="assets/icons/wait-icon.svg" alt="error">                                
                            </div>
                            <p class="text-lg">Requesting...</p>
                            <p class="text-sm">Fetching weather for current location...</p>
                            </div>`;
let choice;

close.addEventListener('click', (e) => {
    e.preventDefault();
    if(!card.classList.contains('d-none')) {
        card.classList.add('d-none');
    }
});

const showCard = () => {
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const getTime = ((timezone) => {

    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const moment = utc + (1000 * timezone);
    const cityTime = new Date(moment);

    return cityMoment = {
        time: cityTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        date: cityTime.toDateString()
    }
   
});

const updateUI = (data) => {

    const timeDets = getTime(data.timezone);
    const tempCelsius = data.main.temp;
    const tempFaren = (tempCelsius*1.8) + 32;
    const weatherIcon = `${data.weather[0].icon}.svg`;
    let rain;

    data.rain ? rain = data.rain['1h'] : rain = 0;


    widget.innerHTML = `<div class="widget-data-left">
        <p class="text-sm alt"><i class="fa fa-map-marker-alt"></i> ${data.name}</p>
        <p class="text-sm"><i class="fa fa-calendar-alt"></i> ${timeDets.date}</p>
        <p class="text-sm"><i class="far fa-clock"></i> ${timeDets.time}</p>
        <div class="main-data">
            <p class="text-lg">${tempCelsius.toFixed(1)}<span>&deg; C</span> | ${tempFaren.toFixed(1)} <span>&deg; F</span></p>
            <p class="text-lg">${data.weather[0].main}</p>
            <p class="text-des" style="font-style:italic; text-transform:capitalize;">${data.weather[0].description}</p>
        </div>
        <p class="text-sm"><i class="fa fa-temperature-low"></i> Feels Like: ${data.main.feels_like} &deg;</p>
        <p class="text-sm"><i class="fa fa-wind"></i> Wind Speed: ${data.wind.speed} km/h</p>
        <p class="text-sm"><i class="fa fa-thermometer-half"></i> Humidity: ${data.main.humidity}%</p>
        <p class="text-sm"><i class="fa fa-tint"></i> Rainfall (past 1 hour): ${rain} mm</p>
    </div>
    <div class="widget-data-right">
    <img src="assets/icons/${weatherIcon}" alt="">
    </div>`;

}



const processWeatherReq = async (info) => {
    
     showCard();
       
      if(choice) {
        try {
            const data = await getWeatherByCity(info);
            updateUI(data);
            console.log(data);
        }
        catch(error) {
            widget.innerHTML = `<div class="widget-message text-center">                    
            <div class="icon">
                <img src="assets/icons/error-icon.svg" alt="error">
            </div>
            <p class="text-lg">Oops...</p>
           <p class="text-sm">${error.message}</p>`;
        }
      }
      else {
        try {
            const data = await getWeatherByLoc(info);
            updateUI(data);
        }
        catch(error) {
            console.log(error.message)
        }
      }  
}


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    choice = true;
    widget.innerHTML = loadingTemplate;
    const city = weatherForm.city.value.trim();
    if(city === '') {
        showCard();
        widget.innerHTML = `<div class="widget-message text-center">
                                <div class="icon-error">
                                    <img src="assets/icons/error-icon.svg" alt="error">                                
                                </div>
                                <p class="text-lg">Oops...</p>
                                <p class="text-sm">Please enter name of city instead of sending empty space... !</p>
                            </div>`;
    }
    else {
        processWeatherReq(city);
    }
    
    weatherForm.reset();

});

locationButton.addEventListener('click', () => {
    showCard();
    weatherForm.reset();
    choice = false;
    widget.innerHTML = loadingTemplate;
    getPosition().then((position)=> {
        const locObj = {latitude: position.coords.latitude, longitude:position.coords.longitude };
        processWeatherReq(locObj);
      })
      .catch((error) => {
        showCard();
        widget.innerHTML = `<div class="widget-message text-center">
                                <div class="icon-error">
                                    <img src="assets/icons/error-icon.svg" alt="error">                                
                                </div>
                                <p class="text-lg">Oops...</p>
                                <p class="text-sm">${error.message} !</p>
                            </div>`;
      });
});





