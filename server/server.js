import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import uploadRoute from './routes/upload.js';
import analyzeRoute from './routes/analyze.js';
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/upload', uploadRoute);
app.use('/api/analyze', analyzeRoute);
app.use('/api/chat', chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});