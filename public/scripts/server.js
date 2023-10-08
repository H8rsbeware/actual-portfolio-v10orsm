//`ctrl + c` or `killall -9 node` in terminal
//`node server.js`
//`bash portfolio.sh` to easily manage all the annoying bits (on my laptop)

//Server runs via node, requiring express for the website routing, nodemailer for emails, and path for formatting uris.
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
//dotenv is used for enviroment variable processing, currently excluded from `email.env` for security purposes.

const siege = require('./modules/siege.js');



require('dotenv').config({path: path.resolve(__dirname, "../../private/.env")});
const backend = express();


//Fowards the public files to the client to allow access to other files within fowarded files.
backend.use(express.static(path.join(__dirname, "../../public")));
//posts user form data through the url and allows for easy parsing, uses one-one elements with no hierachy.
backend.use(express.urlencoded({extended:false}));


//used to shorten routing urls
const fp = path.join(__dirname, '../../public/html');

//Routing, if the client request for certain pages, it fowards the file 
//Since these are public, they are accessable through html too, but i still wrote a `get` for each
backend.get("/index.html", (req, res) => {    
    res.sendFile(`${fp}/index.html`);
})
backend.get("/about.html", (req, res) => {    
    res.sendFile(`${fp}/about.html`);
})
backend.get("/portfolio.html", (req, res) => {    
    res.sendFile(`${fp}/portfolio.html`);
})
backend.get("/projects.html", (req, res) => {    
    res.sendFile(`${fp}/projects.html`);
})
backend.get("/contacts.html", (req, res) => {    
    res.sendFile(`${fp}/contacts.html`);
})
backend.get("/personal.html", (req, res) => {    
    res.sendFile(`${fp}/personal.html`);
    //updates stats.
    siege();
})
backend.get("/", (req,res) => {
    res.sendFile(`${fp}/index.html`);
})



//Post request from contacts, cleans strings and creates an object specific to that request.
backend.post("/contacts.html/post", (req,res) => {
    var email = req.body.email;
    var text = clean(req.body.message);
    var name = clean(`${req.body.fname} ${req.body.lname}`, true)
    var option = new Options(email, text, name);
    transporter.sendMail(option.options() ,(err, msg) =>{
        if(err){
            console.log(err);
            res.sendFile(`${fp}/contacts.html`);
        }else{
            console.log('Email Sent:' + msg.response);
            res.sendFile(`${fp}/success.html`);
        }
    });


})



//ENV to protect my information
const USER =  process.env.EMAIL_SMTP;
const PASS = process.env.PASSWORD_APP;


//Mail options stores the data required for the email client
class Options{
    /**
     * constructor
     * @param {*} from email address from form
     * @param {*} text message to be send
     * @param {*} to defaults to my email
     */
    constructor(from, text, name, to = USER){
        this.from = from;
        this.to = to;
        this.name = name;
        this.text = text;
        this.subject = "";
    }
    //allows the data to be correctly formatted
    options(){
        return this.formatOptions();
    }
    formatOptions(){
        return {
            from: `${this.from}`,
            to: `${this.to}`,
            subject: `Website Contact Request [${this.name}]`,
            text: `${this.from} - ${this.text}`
        };
    }
    
}


//Nodemailer transporter for using email apis.
var transporter = nodemailer.createTransport({
    //Hosted on google apis gmail smtp mailer
    service:"gmail",
    host:"smtp.gmail.com",
    auth:{
        //Auth still needs to be set up, requires hosting.
        user: USER,
        pass: PASS

    }
});




/**
 * Does basic input clean up on strings
 * @param {string} string any string that shouldnt have special characters
 * @param {boolean} remNum any string that shouldnt have special characters
 * @returns clean string
 */
function clean(string, remNum = false){
    if(remNum) return string.replace(/[^a-zA-Z ]/g, "")
    //Replaces all none alphanumeric characters
    return string.replace(/[^a-zA-Z0-9. ]/g, "")
}


//Express/https server, currently opens the tab and logs the port and address.
//Port is passed by host, rather than me.
var server = backend.listen(process.env.PORT || 6100, () => {
    console.log(`started server on port: ${server.address().port}, see at [${server.address().address}]`)
    
})






