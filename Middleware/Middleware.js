const jwt = require('jsonwebtoken');
const Auth = require('../Models/Auth');
const cookieParser = require("cookie-parser");

const Middleware = async (req,res,next) => {
    const token = req.cookies.access_token;

    if(!token){
        return res.sendStatus(403);
    }
    try {
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        const rootUser = await Auth.findOne({ _id: verifyToken._id, "tokens:token": token });

        if(!rootUser){
            throw new Error('User not found in database');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        
        return next();

    } catch (error) {
        res.status(401).send('Unauthorized User');
    }
};

module.exports = Middleware;