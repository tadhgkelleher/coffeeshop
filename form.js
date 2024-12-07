window.onload = function() {
    var form = document.getElementById("contactForm");

    form.onsubmit = function(event) {
        event.preventDefault();

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;

        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields before submitting.");
            return; 
        }

        alert("Thank you for contacting us, " + name + "! We will get back to you soon.");

        form.reset();
    };
};
