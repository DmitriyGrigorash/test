import {CITIES} from "../constants";

let requests = CITIES.map(city =>
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9cff733aee57cb05b63dd4f731c46bc4`,
    {
      method: "GET",
      headers: {"Content-Type": "text/plain"},
    }));

export const fetchCityWeather = (dispatch) => {
  return Promise.all(requests)
    .then(res => res)
    .then(res => Promise.all(res.map(r => r.json())))
    .then(cities => dispatch(fetchSuccess(cities)), err => dispatch(fetchError(err)));
};

export const fetchError = (err) => {
  return { type: 'FETCH_CITY_WEATHER_ERROR', error: err };
};

export const fetchSuccess = (res) => {
  const cities = res.map(city => ({name: city.name, temp: Math.round(city.main.temp)}));
  return { type: 'FETCH_CITY_WEATHER_SUCCESS', payload: cities };
};
