const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');
const specialtyRoutes = require('./routes/specialtyRoutes');
const statusRoutes = require('./routes/statusRoutes');
const educationFormRoutes = require('./routes/educationFormRoutes');
const logger = require('./utils/logger');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/specialty', specialtyRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/education-form', educationFormRoutes);
app.get('/api/test', (req, res) => {
  res.send('Сервер работает!');
});
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Что-то сломалось:' + err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Сервак запущен на ${port}`);
});
