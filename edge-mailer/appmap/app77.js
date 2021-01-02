const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static global directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Source found in readme.md => https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('contact');
}); 

app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({ 
        // host: 'smtp.office365.com',
        // host: 'smtp.gmail.com',
        host: 'smtp.office365.com',
        port: 587,
        // port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'edgemktg@outlook.com',
            pass: 'Supp0rt!' 
        },
        tls:{
            rejectUnauthorized:false
        }
      });
    let mailOptions = {
        from: '"Support Mktg 👻" <edgemktg@outlook.com>', // sender address
        to: "hgavinh2017@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.render('contact', {msg: 'Email has been sent.'});
    });
});

app.listen(2021, () => console.log('Server started on 2021'));