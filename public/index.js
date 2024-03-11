const getforecast = async (target) => {
    const el = document.getElementById('result');
    el.innerHTML = '...загрузка';
    try {
        const data = await fetch(`/api/forecast?target=${target}`);
        const res = await data.json();
        el.innerHTML = `
            <div>Дата:${res.date}</div>
            <div>Прогноз:${res.weather}</div>
        `;
    } catch (err) {
        el.innerHTML = 'Ошибка, нет данных';
    }
};
