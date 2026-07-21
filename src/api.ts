import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/", authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

