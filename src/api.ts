import express, { request } from 'express';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js' 
import { authStatus } from './middleware/authStatus.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from './utils/auth.js';
import cors from "cors";


import { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT;
app.use(cors({
    origin: "http://localhost:3000/",
    credentials: true
}))

app.use(express.json());

app.use("/dashboard", authStatus);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

