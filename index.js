import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Load .env variables
dotenv.config();

// Parsing middleware
app.use(express.json({ extended: true, limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Allow CORS
app.use(cors());

const PORT = process.env.PORT || 5000;

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
