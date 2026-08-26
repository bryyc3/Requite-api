import express, { request } from 'express';
import businessRoutes from './routes/businessRoutes.js';
import { businessStatus } from './middleware/businessStatus.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from './utils/auth.js';
import cors from "cors";


import { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json());

app.all('/authorize/{*any}', toNodeHandler(auth));

app.use("/business", businessRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

