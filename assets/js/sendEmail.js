/**
 * Function to handle EmailJS API.
 * 'this' data on line 9 is taken
 * from index.html line 400.
 */
window.onload = function formSubmission() {
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    emailjs.sendForm("service_h1fgdpq", "template_ms9blkp", this)
      .then(function() {
        success();
      }, function(error) {
        error();
      });
  });
}

/**
 * @formSubmission
 * If form data is sent succuessfully,
 * hides the form and shows a success message.
 */
function success() {
    $("#form-ready").addClass("form-hidden");
    $("#form-submitted").removeClass("form-hidden");
}

/**
 * @formSubmission
 * If sending form data results in an error,
 * hides the form and shows an error message
 * which provides a direct email contact.
 */
function error() {
    $("#form-error").removeClass("form-hidden");
}