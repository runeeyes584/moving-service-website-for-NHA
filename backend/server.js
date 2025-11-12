const express = require('express');
const cors = require('cors');
const connectDB = require('./db');



// API routers
const servicesApiRouter = require('./routes/api/services');
const bookingsApiRouter = require('./routes/api/bookings');
const reviewsApiRouter = require('./routes/api/reviews');
const authApiRouter = require('./routes/api/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Kết nối MongoDB
connectDB();

app.use(cors());
app.use(express.json());



app.use('/api/services', servicesApiRouter);
app.use('/api/bookings', bookingsApiRouter);
app.use('/api/reviews', reviewsApiRouter);
app.use('/api/auth', authApiRouter);


const employeesApiRouter = require('./routes/api/employees');
app.use('/api/employees', employeesApiRouter);

app.get('/', (req, res) => {
  res.send('Moving Service Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
