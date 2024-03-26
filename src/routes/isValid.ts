import { iRequestData } from './extructData';

export const isValid = (requestData: iRequestData) => {
    if (!requestData.city) throw new Error('wrong_data');
};
