const express = require('express');
const app = express();
const bugs = require('./routes/bugs');
const home = require('./routes/home');


app.use(express.json());
app.use(express.static('public'));
app.use('/', home);
app.use('/api/bugs', bugs);


// View Engine
app.set('view engine', 'pug');
app.set('views', './views')


// Config
const PORT = process.env.PORT || 3000;


// Start Server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});