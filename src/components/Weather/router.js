const { Router } = require('express');
const csrf = require('csurf');
const WeatherComponent = require('.');

const csrfProtection = csrf({ cookie: true });

/**
 * Express router to mount weather related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving for weather.
 * @name /v1/weather
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', csrfProtection, WeatherComponent.getWeatherPage);

/**
 * Route serving for weather.
 * @name /v1/weather
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', csrfProtection, WeatherComponent.getWeatherData);

module.exports = router;
