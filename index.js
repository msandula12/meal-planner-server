import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// Import routes
import scheduleRoutes from './routes/schedule.js';

// Initiate Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Load .env variables
dotenv.config();

// Parsing middleware
app.use(express.json({ extended: true, limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Allow CORS
app.use(cors());

// Define routes
app.get('/', (_, res) => res.send('MealPlanner API'));
app.use('/schedule', scheduleRoutes);

// Connect to database
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
