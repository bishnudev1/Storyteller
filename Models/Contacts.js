const mongoose = require('mongoose');

const Feedbacks = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    query: {
        type: String,
        require: true
    }
});

const Contacts = mongoose.model('contacts',Feedbacks);

module.exports = Contacts;