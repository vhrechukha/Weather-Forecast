const WeatherService = require('./service');
const WeatherValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function getWeatherPage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getWeatherPage(req, res, next) {
    try {
        return res.render('index.ejs', {
            data: {
                message: 'Write your city',
                weather: [],
            },
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function getWeatherData
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getWeatherData(req, res, next) {
    try {
        const { city, _csrf } = req.body;
        const { error } = WeatherValidation.validateCity(city, _csrf);

        if (error) {
            throw new ValidationError(error.details);
        }

        const weather = await WeatherService.getAllWeatherForecast(city);
        const currentTimeWeather = await WeatherService.getDataAsPerCurrentTimeSlot();
        const filteredWeather = await WeatherService.getFilteredWeather(weather, currentTimeWeather);

        return res.status(200).render('index.ejs', {
            data: {
                message: city,
                weather: filteredWeather,
            },
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).render('index.ejs', {
                data: {
                    messageError: 'Write city correctly',
                    weather: [],
                },
                csrfToken: req.csrfToken(),
            });
        }
        if (error.message === 'Request failed with status code 404') {
            return res.status(404).render('index.ejs', {
                data: {
                    messageError: 'City not found',
                    weather: [],
                },
                csrfToken: req.csrfToken(),
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    getWeatherPage,
    getWeatherData,
};
