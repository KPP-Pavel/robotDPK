import { Express } from 'express';
import { getForecast } from '../utils';
import { eTarget } from '../constants';
import { getOpenWeatherMap } from './getOpenWeatherMap';
import { extructData } from './extructData';
import { isValid } from './isValid';

export const useRoutes = (app: Express) => {
    app.get('/api/forecast', async (req, res) => {
        try {
            const requestData = extructData(req);
            isValid(requestData);
            const forecast = await getOpenWeatherMap(requestData);

            if (forecast) {
                res.json(forecast);
                return;
            }

            return res.status(404).send('no data');
        } catch (err) {
            console.log('err', err);

            const error = err as Error;
            res.status(500).send(error.message);
        }
    });
};
