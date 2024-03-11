import { dates, eTarget } from './constants';

export const getForecast = (target: eTarget) => {
    let dateFind = '';
    const setDate = () => {
        dateFind = date.toLocaleDateString('Ru-ru');
    };
    const date = new Date();
    switch (target) {
        case eTarget.yesterday:
            date.setDate(date.getDate() - 1);
            setDate();
            break;
        case eTarget.today:
            setDate();
            break;
        case eTarget.tomorrow:
            date.setDate(date.getDate() + 1);
            setDate();
            break;
    }
    return dates.find((item) => item.date == dateFind);
};
