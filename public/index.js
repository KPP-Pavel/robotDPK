const tryApp = async (foo) => {
    const el = document.getElementById('result');
    el.innerHTML = '...загрузка';
    try {
        await foo(el);
    } catch (err) {
        console.log('err', err);
        el.innerHTML = 'Ошибка, нет данных';
    }
};

const getCurrentForecast = () => {
    tryApp(async (el) => {
        const data = await fetch(`/api/forecast?city=Moscow`);
        const response = await data.json();
        const res = response.current;
        const HTML = extructHTML(res);

        el.innerHTML = HTML;
    });
};
const get8DaysForecast = () => {
    tryApp(async (el) => {
        const data = await fetch(`/api/forecast?city=Moscow`);
        const response = await data.json();
        const res = response.daily;
        const HTML = res?.map((item) => extructHTML(item)).join('*******************');

        el.innerHTML = HTML;
    });
};

const getTemp = (res) => {
    if (res.temp.min != undefined) return `мин: ${res.temp.min}°, макс: ${res.temp.max}°`;
    return `${res.temp}°`;
};

const getTempFeelsLike = (res) => {
    if (res.temp.day != undefined)
        return `ночь: ${res.temp.night}°, день: ${res.temp.day}°`;
    return `${res.temp}°`;
};

const getVisibility = (res) => {
    if (!res.visibility) return '';
    const visibility = (res.visibility / 1000).toFixed(1);
    return `<div>Видимость: ${visibility}км</div>`;
};
const extructHTML = (res) => {
    if (!res) throw new Error('empty data');

    return `
        <div>Дата: ${getDate(res.dt)}</div>
        <div>Температура: ${getTemp(res)}</div>
        <div>Ощущается как: ${getTempFeelsLike(res)}°</div>
        <div>Облачность: ${res.clouds}%</div>
        <div>Влажность: ${res.humidity}%</div>
        <div>Давление: ${res.pressure}hPa</div>
        <div>Восход солнца: ${getTime(res.sunrise)}</div>
        <div>Заход солнца: ${getTime(res.sunset)}</div>
        ${getVisibility(res)}
        <div>Скорость ветра: ${res.wind_speed}</div>
    `;
};

const getDtNum = (v) => {
    if (v < 10) return `0${v}`;
    return v;
};
const getDate = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const year = date.getFullYear();
    const month = getDtNum(date.getMonth() + 1);
    const day = date.getDate();
    return `${day}.${month}.${year}`;
};
const getTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const hours = getDtNum(date.getHours());
    const min = getDtNum(date.getMinutes());
    const sec = getDtNum(date.getSeconds());

    return `${hours}:${min}:${sec}`;
};

const printChart = () => {
    tryApp(async (el) => {
        const data = await fetch(`/api/forecast?city=Moscow`);
        const response = await data.json();
        const HTML = `<canvas id="myChart1"></canvas>
        <canvas id="myChart2"></canvas>
        <canvas id="myChart3"></canvas>
        <canvas id="myChart4"></canvas>`;

        el.innerHTML = HTML;

        const ctx1 = document.getElementById('myChart1');
        const ctx2 = document.getElementById('myChart2');
        const ctx3 = document.getElementById('myChart3');
        const ctx4 = document.getElementById('myChart4');
        const res = response.daily;
        const labels = res.map((item) => getDate(item.dt));
        const dataChartTemp = res.map((item) =>
            ((item.temp.max + item.temp.min) / 2).toFixed(2),
        );
        const dataChartPres = res.map((item) => item.pressure);
        const dataChartWind = res.map((item) => item.wind_speed);
        const dataChartClouds = res.map((item) => item.clouds);

        const getDataChart = (label, data) => ({
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label,
                        data,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        // tension: 0.1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        new Chart(ctx1, getDataChart('Температура', dataChartTemp));
        new Chart(ctx2, getDataChart('Давление', dataChartPres));
        new Chart(ctx3, getDataChart('Облачность', dataChartClouds));
        new Chart(ctx4, getDataChart('Скорость ветра', dataChartWind));
    });
};
