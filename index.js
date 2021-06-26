const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bugs = require('./routes/bugs');
const home = require('./routes/home');


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/', home);
app.use('/api/bugs', bugs);


// View Engine
app.set('view engine', 'pug');
app.set('views', './views')


// Config
const PORT = process.env.PORT || 3000;
const dbUSER = process.env.dbUSER;
const dbPASS = process.env.dbPASS;

// MongoDB
mongoose.set('returnOriginal', false);
mongoose.connect(`mongodb+srv://${dbUSER}:${dbPASS}@bug-tracker.qxllb.mongodb.net/bug_tracker?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {console.log('Connected to MongoDB')}).catch(err => {console.log('Failed', err)});


// Start Server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});