var config = require('./config/mail');
var google = require('./config/google');
var nodemailer = require('nodemailer');

var send = function (args) {
  let transporter = nodemailer.createTransport({
    'service': 'gmail',
    'auth': {
        'type': 'OAuth2',
        'user': google.client_email,
        'serviceClient': google.client_id,
        'privateKey': google.private_key
    }
  });
  transporter.on('token', token => console.log(token));

  let message = {
    'from': `"${config.serverFromName}" <${config.serverFromMail}>`,
    'to': args.to,
    'subject': args.subject,
    'text': args.text,
    'html': `<p>${args.text}</p>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Mail couldn\'t be sent because: ' + err);
    } else {
      console.log('Mail sent');
    }
  });
};