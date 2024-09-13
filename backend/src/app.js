const express = require('express');
const cors = require('cors');
const expressListRoutes = require('express-list-routes');
const productsRoutes = require('./routes/products.route');
const saleRoutes = require('./routes/sales.route');

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5174', 'http://localhost:5175'], // Substitua pela origem correta do seu frontend
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', saleRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  const routes = expressListRoutes(app);
  response.json({ status: 'Store Manager UP!', routes });
});

app.use((error, _rea, res, _next) => {
  const status = error.status || 500;
  console.log({ message: error.message });
  res.status(status).json({ message: 'Internal Service Error' });
});

module.exports = app;
