//process requests here; pull in request object and response object, run some logic and ultimately respond to it.
//POST requests to the /submitContact route runs the submitContact.submitContact function from here.

exports.submitContact = function(req, res, next) {
  //send the contact email with formProps contained on req.
  console.log("req.body from inside submitContact controller: ", req.body);

  //front-end will invoke 'callback()' redirecting to new page
};
