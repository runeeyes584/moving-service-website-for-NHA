const mongoose = require('mongoose');

const connectDB = async () => {
    try {
    await mongoose.connect('mongodb+srv://kaleidoscope:453145@nguyenhoangan.7pu2fas.mongodb.net/SNHA?appName=NGUYENHOANGAN', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
