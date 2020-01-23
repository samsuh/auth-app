const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.sendGridKey);

// const Mailer = require("../services/Mailer");
// const contactTemplate = require("../services/emailTemplates/contactTemplate");
//process requests here; pull in request object and response object, run some logic and ultimately respond to it.
//POST requests to the /submitContact route runs the submitContact.submitContact function from here.

exports.submitContact = function(req, res, next) {
  //send the contact email with formProps contained on req.
  console.log("req.body from inside submitContact controller: ", req.body);
  //   const mailer = new Mailer(
  //     //configuration of the email goes here
  //     req.body,
  //     contactTemplate(req.body)
  //   );
  //   mailer.send();

  const msg = {
    to: "sam@archon.cloud",
    from: req.body.email,
    subject: "Website Contact Form Submission",
    text: req.body.message,
    html:
      "<strong>Contact Name: </strong>" +
      req.body.name +
      "<br /><strong>Contact Email: </strong>" +
      req.body.email +
      "<br /><strong>Message: </strong>" +
      req.body.message
  };
  sgMail.send(msg);

  //front-end will invoke 'callback()' redirecting to new page
};
