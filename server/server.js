const express = require('express');
let app = express();
const cors = require('cors');
const apiRouter = require('./routes');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouter);

app.listen(3000, () => console.log('Server is up'));