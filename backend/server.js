require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/config');


const authRoutes = require('./routes/authRoutes');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
const postPublicRoutes = require('./routes/postPublicRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventPublicRoutes = require('./routes/eventPublicRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/public/posts', postPublicRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/public/events', eventPublicRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

