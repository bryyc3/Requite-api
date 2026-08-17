import express, { request } from 'express';
import dashboardRoutes from './routes/dashboardRoutes.js';
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
app.all('/authorize/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

