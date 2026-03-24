import express from 'express';
import cors from 'cors';
import clockInRoutes from './routes/clockInRoutes';
import venueRoutes from './routes/venueRoutes';
import adminRoutes from './routes/adminRoutes';


const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', clockInRoutes);
app.use('/api', venueRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});




export default app;
