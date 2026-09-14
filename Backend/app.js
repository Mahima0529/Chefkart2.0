const express = require('express');
const createError = require('http-errors');
const connectDB= require('./config/db');
const UserRoutes = require('./routes/User.route');
const BlogRoutes = require('./routes/Blog.route');
const TestimonialRoutes = require('./routes/Testimonial.route');
const GalleryRoutes = require('./routes/Gallery.route');
const CrouselRoutes = require('./routes/Crousel.route');
const ChefRoutes = require('./routes/Chef.route');
const BookingRoutes = require('./routes/Booking.routes');
const cors = require('cors');
const HomePageRoutes = require('./routes/HomePage.route');
const FoodRoutes = require('./routes/Food.route');
const ServiceRoutes = require('./routes/Service.route');
const InvestorRoutes = require('./routes/Investor.route');
const JoinRoutes = require('./routes/Join.route');
const ContactRoutes = require('./routes/Contact.route');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
connectDB();

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/auth', UserRoutes);
app.use('/blog', BlogRoutes);
app.use('/testimonial', TestimonialRoutes);
app.use('/gallery', GalleryRoutes);
app.use('/crousel', CrouselRoutes);
app.use('/chef', ChefRoutes);
app.use('/booking', BookingRoutes);
app.use('/home', HomePageRoutes);
app.use('/foodGall', FoodRoutes);
app.use('/food', FoodRoutes);
app.use('/service', ServiceRoutes);
app.use('/ser', ServiceRoutes);
app.use('/investor', InvestorRoutes);
app.use('/join', JoinRoutes);
app.use('/contact', ContactRoutes);
app.use('/payment', require('./routes/Payment.route'));

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
