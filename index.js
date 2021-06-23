const Joi = require('joi');
const express = require("express");
const app = express();
app.use(express.json())

// Config
const PORT = process.env.PORT || 3000;

// Data
let BUGS = require('./data/BUGS');

// Routes
app.get('/', (req, res) => {
    res.send("The server is working fine...");
});

app.get('/api/bugs', (req, res) => {
    res.send(JSON.stringify(BUGS));
});

app.get('/api/bug/:id', (req, res) => {
    const bug = BUGS.find(item => item.id === parseInt(req.params.id));
    if(!bug) return res.status(404).send("The item not found with the given ID!");
    res.send(bug);
});

app.put('/api/bug/:id', (req, res) => {
    const bug = BUGS.find(item => item.id === parseInt(req.params.id));
    if(!bug) return res.status(404).send("The item not found with the given ID!");
    if(bug.isResolved) return res.status(400).send("The item is already solved");

    const {error} = validateSolution(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    bug.bugSolution = req.body.bugSolution;
    bug.isResolved = true;
    res.send(bug);
});

app.post('/api/bugs', (req, res) => {
    const {error} = validateInfo(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newBugItem = {
        id: BUGS.length+1,
        bugInfo: req.body.bugInfo,
        isResolved: false,
        bugSolution: ""
    };
    BUGS.push(newBugItem);
    res.send(JSON.stringify(newBugItem));
});

app.delete('/api/bug/:id', (req, res) => {
    const bug = BUGS.find(item => item.id === parseInt(req.params.id));
    if(!bug) return res.status(404).send("The item not found with the given ID!");

    const index = BUGS.indexOf(bug);
    BUGS.splice(index, 1);
    res.send(bug);

});

// Validation functions
function validateSolution(solution) {
    const schema = Joi.object({
        bugSolution: Joi.string().trim().min(1).required()
    });
    const result = schema.validate(solution);
    return result;
}

function validateInfo(info) {
    const schema = Joi.object({
        bugInfo: Joi.string().trim().min(1).required()
    });
    const result = schema.validate(info);
    return result;
}


// Start Server
app.listen(PORT, () => {
    console.log(
        `Listening on port: ${PORT}
        \nSupported Methods: GET, POST, PUT, DELETE
        \n====== Routes ======
        \n1) /api/bugs [GET, POST]\n2) /api/bug/:id [GET, PUT, DELETE]
        `
    );
});