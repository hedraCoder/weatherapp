const weatherForm = document.querySelector('.widget-form');
const locationButton = document.querySelector('.btn-location');
const widget = document.querySelector('.widget-data');
const loadingTemplate = `<div class="widget-message text-center">
                            <div class="icon-wait">
                                <img src="assets/icons/wait-icon.svg" alt="error">                                
                            </div>
                            <p class="text-lg">Requesting...</p>
                            <p class="text-sm">Fetching weather for current location...</p>
                            </div>`;
let choice;



const processWeatherReq = async (info) => {
    if (choice) {
        const data = await getWeatherByCity(info);
        console.log(data);
    }
    else {
        const data = await getWeatherByLoc(info);
        console.log(data);
    }
}


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    choice = true;
    widget.innerHTML = loadingTemplate;
    const city = weatherForm.city.value.trim();
    if(city === '') {
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
    weatherForm.reset();
    choice = false;
    widget.innerHTML = loadingTemplate;
    getPosition().then((position)=> {
        const locObj = {latitude: position.coords.latitude, longitude:position.coords.longitude };
        processWeatherReq(locObj);
      })
      .catch((error) => {
        widget.innerHTML = `<div class="widget-message text-center">
                                <div class="icon-error">
                                    <img src="assets/icons/error-icon.svg" alt="error">                                
                                </div>
                                <p class="text-lg">Oops...</p>
                                <p class="text-sm">${error.message} !</p>
                            </div>`;
      });
});




