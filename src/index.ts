import express from 'express';
import { eTarget } from './constants';
import { getForecast } from './utils';
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/forecast', (req, res) => {
    const target = req.query.target as eTarget;
    const forecast = getForecast(target);
    if (forecast) {
        res.json(forecast);
        return;
    }

    return res.status(404).send('no data');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
