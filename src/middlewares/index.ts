import { Express } from 'express';
import express from 'express';

export const useMiddlewares = (app: Express) => {
    app.use(express.static('public'));
};
