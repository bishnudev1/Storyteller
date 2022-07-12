const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Stories = require('./Models/StoryModel');
const Contacts = require('./Models/Contacts');
const Middleware = require('./Middleware/Middleware');
const Auth = require('./Models/Auth');
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

dotenv.config({path:'./config.env'});

mongoose.connect('mongodb://localhost:27017/storyteller', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.warn('Connected to Database');
}).catch((err) => {
    console.warn(`Could not connect to Database : ${err}`);
});


app.get('/Stories', async (req, res) => {
    const data = await Stories.find();
    res.json(data);
});


app.get('/',(req,res) => {
    res.send('This is server from Heroku!');
});

// Adding A Story in Storyteller

app.post('/Add-Story', (req, res) => {
    const { title, name, desc } = req.body;

    if (!title || !name || !desc) {
        res.status(422).json({ message: "Add All Details Properly" });
    }
    const newStory = new Stories({ title, name, desc });
    newStory.save().then(() => {
        res.status(201).json({ message: "New Story Added" });
    }).catch((err) => {
        res.status(422).json({ message: "Failed to Add Story" });
    })
});

// Adding Feedbacks or Contacts Query in Storyteller

app.post('/Contact', (req, res) => {
    const { name, email, query } = req.body;

    if (!name || !email || !query) {
        res.status(422).json({ message: "Fill all details properly" });
    }
    const newFeedback = new Contacts({ name, email, query });

    newFeedback.save().then(() => {
        res.status(201).json({ message: "Thanks for querying us !" });
    }).catch((err) => {
        res.status(422).json({ message: "Failed to add feedbacks" });
    })
});

// Creating an Account in Storyteller (User-Registration)

app.post('/Register-User', async (req, res) => {
    const { name, email, password, c_password, check } = req.body;

    console.log(req.body);

    if (!name || !email || !password || !c_password || !check) {
        res.status(422).json({ message: "Give all credintials properly" });
    }

    try {
        const response = await Auth.findOne({ email: email });
        if (response) {
            res.status(422).json({ message: "Email already exists" });
        }
        if (password === c_password) {
            const newUser = new Auth({ name, email, password, c_password, check });
            await newUser.save();
            res.status(201).json({ message: "User registered successfully" });
        }
        else {
            res.status(422).json({ message: "Passwords are not matching" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Login to Storyteller Account if user exists

app.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ message: "Give all details for login" });
    }
    try {
        let token;
        const isExist = await Auth.findOne({ email: email });
        if (isExist) {
            const compareUser = await bcrypt.compare(password, isExist.password);
            token = await isExist.generateAuthToken();

            res.cookie("access_token", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (compareUser) {
                res.status(201).json({message:"Login Successfully"});
            }
            else {
                res.status(422).json({message:"Wrong credintials"});
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.get('/Logout-User', (req, res) => {
    res.clearCookie("access_token", { path: "/" });
    res.status(200).send('User Logged Out');
});

app.get('/About', Middleware, (req,res) => {
    res.send(req.rootUser);
});

app.delete("/Delete-Story/:id", async(req,res) => {
    const id = req.params.id;
    await Stories.findByIdAndRemove(id).exec();
    res.send("Deleted");
});

app.put("/Update-Story",async(req,res) => {
    const id = req.body.id;
    const newtitle = req.body.newtitle;
    const newdesc = req.body.newdesc;

    if(newtitle === '' && newdesc === ''){
        res.status(422).json("Enter valid details");
    }
    try {
        Stories.findById(id, function (err, docs) {
            if(err){
                console.log(err);
            }
            else{
                docs.title = newtitle;
                docs.desc = newdesc;
                docs.save();
            }
        })
    } catch (error) {
        console.log(error);
    }

});


app.listen(port, () => {
    console.warn(`Server has started at ${port}`);
});