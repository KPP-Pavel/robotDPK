import { Express } from 'express';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

const isDev = process.env.NODE_ENV == 'development';

export const useMiddlewares = (app: Express) => {
    app.use(morgan('short'));
    const pathStatic = isDev ? 'public' : path.resolve(__dirname, 'public');
    app.use(express.static(pathStatic));
};
