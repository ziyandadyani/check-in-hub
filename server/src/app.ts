import express from 'express';
import cors from 'cors';
import clockInRoutes from './routes/clockInRoutes';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', clockInRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});




export default app;