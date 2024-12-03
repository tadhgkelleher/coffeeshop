// Wait for the page to finish loading
window.onload = function() {
    // Get the form element
    var form = document.getElementById("contactForm");

    // Add a function that runs when the form is submitted
    form.onsubmit = function(event) {
        // Stop the form from submitting the usual way
        event.preventDefault();

        // Get the values entered by the user
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;

        // Check if any fields are empty
        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields before submitting.");
            return; // Stop here if something is missing
        }

        // Show a confirmation message
        alert("Thank you for contacting us, " + name + "! We will get back to you soon.");

        // Clear the form fields
        form.reset();
    };
};
