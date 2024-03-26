import { iRequestData } from './extructData';

export const getOpenWeatherMap = async (requestData: iRequestData) => {
    const { city } = requestData;
    const forecast = await fetch(
        `https://openweathermap.org/data/2.5/onecall?lat=55.7522&lon=37.6156&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`,
    );
    const res = await forecast.json();
    return res;
};
