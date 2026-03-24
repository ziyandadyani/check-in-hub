import * as appModule from './app';
import dotenv from 'dotenv';
dotenv.config();

const app = (appModule as any).default || appModule;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});