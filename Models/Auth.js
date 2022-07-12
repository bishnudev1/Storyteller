const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const AuthSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    c_password: {
        type: String,
        require: true
    },
    check: {
        type: Boolean,
        require: true
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
});

AuthSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.c_password = await bcrypt.hash(this.c_password, 12);
    }
    next();
});

AuthSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id: this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

const Auth = mongoose.model('auth-storyteller', AuthSchema);

module.exports = Auth;