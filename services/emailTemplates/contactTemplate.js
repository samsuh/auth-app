//define and export a function to be used as the body of any contact email

module.exports = stuff => {
  return (
    "<div>" +
    "This is an automated email from submitting the contactForm on the Landing page." +
    stuff +
    "</div>"
  );
};
