const weatherForm = document.querySelector('.widget-form');
const locationButton = document.querySelector('.btn-location');


const processWeatherReq = async (info) => {
    console.log(info);
}


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const city = weatherForm.city.value;
    processWeatherReq(city);
    weatherForm.reset();

});

locationButton.addEventListener('click', () => {
    weatherForm.reset();
   
});
