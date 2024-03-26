import express from 'express';
import { useMiddlewares } from './middlewares';
import { useRoutes } from './routes';
const app = express();
const port = 3000;

useMiddlewares(app);
useRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
