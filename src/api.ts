import express, { request } from 'express';
import authRoutes from './routes/authRoutes.js';
import dbTestRoutes from './routes/dbTestRoutes.js';
import { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get("/", (req: Request, res: Response) =>{
    res.send("server is running");
})

app.use("/", authRoutes);
app.use("/", dbTestRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

