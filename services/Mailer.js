// //exports a class

// const sendgrid = require("sendgrid");
// //taking a property off sendgrid object and assigning it to 'helper' consistent with sendgrid naming conventions
// const helper = sendgrid.mail;
// const keys = require("../config/keys");

// //helper.Mail is an object htat takes in configuration and spits out a mailer. we want to customize this.
// class Mailer extends helper.Mail {
//   //creating new Mailer() will trigger constructor automatically.
//   //subject, recipient are required to send an email. content a string that will be the body of the email.
//   constructor({ subject, recipients }, content) {
//     //any constructor defined on the Mail class gets exceuted by calling super()
//     super();

//     //define property that representws the sengrid object to communicate to sendgrid api
//     //used to actually send the email using sendgrid.
//     this.sgApi = sendgrid(keys.sendGridKey);

//     //sendgrid-specific setup
//     //define email properties.
//     //whenever we have an isntance of Mailer has a specific from_email property; "who this is From:"
//     //helper.Email is from sendgrid library to properly format
//     this.from_email = new helper.Email("no-reply@archon.cloud");
//     //this will be the subject of the email
//     this.subject = subject;
//     //this will be html to display inside the email
//     //helper.Content is from sendgrid library to properly format
//     this.body = new helper.Content("text/html", content);
//     //who will this email be sent to?
//     //HARDCODED FOR contactForm. generalize later when different emails being sent (like registration)
//     //  this.recipients = this.formatAddresses(recipients)
//     //initial formatting to create array of many emails
//     this.recipients = new helper.Email("sam@archon.cloud");

//     //make sure body gets assigned the 'content' of the email
//     //addContent is provided from Mail class
//     this.addContent(this.body);

//     //enable clickTracking inside the email. commented out cuz we're not using it yet. defined in class below.
//     // this.addClickTracking();

//     //disabled because recipients is currently hardcoded for contactForm only. helper function defined in class below.
//     // this.addRecipients();
//   }
//   //this is how to set up clicktracking from sendgrid. disabled because unused
//   //   addClickTracking() {
//   //     const trackingSettings = new helper.TrackingSettings();
//   //     const clickTracking = new helper.ClickTracking(true, true);
//   //     trackingSettings.setClickTracking(clickTracking);
//   //     this.addTrackingSettings(trackingSettings);
//   //   }

//   //disabled cuz not used
//   //   addRecipients(){
//   //       //define personalize variable
//   //       const personalize = new helper.Personalization()
//   //       //iterate over 'recipients' defined above each being a helper.Email(email)
//   //       //for each, add them to the 'personalize' object
//   //       this.recipients.forEach(recipient => {
//   //           personalize.addTo(recipient)
//   //       })
//   //       //after all added to 'personalize' object, add that object to a call to addPersonalization from Mail base class.
//   //       this.addPersonalization(personalize)
//   //   }

//   //function to actually communicate Mailer to API. 'send'
//   async send() {
//     try {
//       //create sendgrid api request with configuration options
//       const request = this.sgApi.emptyRequest({
//         method: "POST",
//         path: "/v3/mail/send",
//         body: this.toJSON()
//       });
//       //send request to sendgrid. return 'response' from this send() function.
//       const response = this.sgApi.API(request);
//       return response;
//     } catch (e) {
//       console.log("error", e);
//     }
//   }
// }

// module.exports = Mailer;
