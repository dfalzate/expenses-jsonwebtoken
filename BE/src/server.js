require('dotenv').config();
var cors = require('cors');
const express = require('express');
require('./db');
const usersRoute = require('./routes/user.route');
const expensesRoute = require('./routes/expense.route');
const { auth } = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.use('/expenses', auth, expensesRoute);

app.listen(process.env.PORT, () => {
   console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
