export enum eTarget {
    yesterday = 'yesterday',
    today = 'today',
    tomorrow = 'tomorrow',
}

class Forecast {
    date: string;
    weather: string;
    constructor(date: string, weather: string) {
        this.date = date;
        this.weather = weather;
    }
}

export const dates: Forecast[] = [
    new Forecast('10.03.2024', 'от -5c° до 0c°'),
    new Forecast('11.03.2024', 'от 0c° до +3c°'),
    new Forecast('12.03.2024', 'от +5c° до +7c°'),
    new Forecast('13.03.2024', 'от +3c° до +7c°'),
];
