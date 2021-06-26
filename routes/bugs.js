const express = require('express');
const router = express.Router();
const {validateSolution, validateInfo} = require('../database/Bug');

// Data
const Bug = require('../database/Bug');


// Routes

router.get('/', async (req, res) => {
    const bugs = await Bug.find();
    res.send(bugs);
});

router.get('/:id', async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    if(!bug) return res.status(404).send("The item not found with the given ID!");
    res.send(bug);
});

router.put('/:id', async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    if(!bug) return res.status(404).send("The item not found with the given ID!");
    if(bug.isResolved) return res.status(400).send("The item is already solved");

    const {error} = validateSolution(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    bug.bugSolution = req.body.bugSolution;
    bug.isResolved = true;
    await bug.save();
    res.send(bug);
});

router.post('/', async (req, res) => {
    const {error} = validateInfo(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const bugItem = new Bug({
        bugInfo: req.body.bugInfo
    });
    const result = await bugItem.save();
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if(!bug) return res.status(404).send("The item not found with the given ID!");

    res.send(bug);
});


module.exports = router;