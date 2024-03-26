import { Request } from 'express';
import { eTarget } from '../constants';

export interface iRequestData {
    city: string;
}

export const extructData = (req: Request): iRequestData => {
    const city = req.query.city as iRequestData['city'];

    return { city };
};
