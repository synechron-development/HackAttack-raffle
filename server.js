  var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port =  process.env.PORT || 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });

    app.post('/send-email', function (req, res) {

      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'hackattack.synechron@gmail.com',
            pass: 'synechron123'
          }
      });

      // console.log("body " + req.body);
      // console.log("answer " + req.body.answer);

      let htmlSnippet = '<p>Candidates full name: ' +  req.body.fullname + '</p>';
        htmlSnippet += '<p>Candidates email: ' + req.body.email + '</p>';
        htmlSnippet += '<p>Candidates phone number: ' + req.body.phoneNumber + '</p>'
        htmlSnippet += '<p>Candidates tech stack: ' + req.body.techStack + '</p>'
        htmlSnippet += '<p>Candidates level of experience: ' + req.body.experience + '</p>';

      let mailOptions = {
          from: '"Raffle Draw Synechron" <xx@gmail.com>', // sender address
          to: "global.careers@synechron.com", // list of receivers
          subject: "Raffle Draw Applicant", // Subject line
          html: htmlSnippet  // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
      });
    });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
