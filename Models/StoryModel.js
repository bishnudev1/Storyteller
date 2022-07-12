const mongoose = require('mongoose');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;



const StoryModel = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    time: {
        type: String,
        default: today
    }
});

const Stories = mongoose.model('all-stories', StoryModel);

module.exports = Stories;