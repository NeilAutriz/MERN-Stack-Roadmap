const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    title: {type: String, required: true}, 
    content: {type: String, required: true},
    author: {type: String, required: true} 
});

module.exports = mongoose.model('Goal', goalSchema);