const axios = require('axios');

/**
 * @method getAllWeatherForecast
 * @param { city }
 * @returns {any}
 */
function getAllWeatherForecast(city) {
    return axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.APPID}`,
    )
        .then((response) => response.data.list);
}

/**
 * @method getDataAsPerCurrentTimeSlot
 * @param {any}
 * @returns {any}
 */
function getDataAsPerCurrentTimeSlot() {
    const cHours = new Date().getHours();
    let timeSlot = '';
    if (cHours >= 0 && cHours < 3) timeSlot = '0';
    else if (cHours >= 3 && cHours < 6) timeSlot = '3';
    else if (cHours >= 6 && cHours < 9) timeSlot = '6';
    else if (cHours >= 9 && cHours < 12) timeSlot = '9';
    else if (cHours >= 12 && cHours < 15) timeSlot = '12';
    else if (cHours >= 15 && cHours < 18) timeSlot = '15';
    else if (cHours >= 18 && cHours < 21) timeSlot = '18';
    else if (cHours >= 21) timeSlot = '21';

    return timeSlot;
}

/**
 * @method getFilteredWeather
 * @param {weather, currentTime}
 * @returns {weatherArray}
 */
function getFilteredWeather(weather, currentTime) {
    const weatherArray = [
        'coming soon',
        'coming soon',
        'coming soon',
        'coming soon',
        'coming soon',
        'coming soon',
        'coming soon',
    ];

    let dayName;
    let cHours;
    let time;

    weather.forEach((i) => {
        time = new Date(i.dt_txt);
        cHours = time.getHours();
        dayName = time.getDay();

        if (cHours === Number(currentTime)) weatherArray[dayName] = i.weather[0].main;
    });
    return weatherArray;
}


module.exports = {
    getAllWeatherForecast,
    getDataAsPerCurrentTimeSlot,
    getFilteredWeather,
};
