const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    bugInfo: {
        type: String,
        required: true
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    bugSolution: {
        type: String,
        default: ""
    }
});

const Bug = mongoose.model('bug', schema);

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

module.exports = Bug;
module.exports.validateSolution = validateSolution;
module.exports.validateInfo = validateInfo;
