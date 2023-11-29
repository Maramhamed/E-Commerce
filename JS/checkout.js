// Function to validate email format
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate address format (you can customize this based on your requirements)
function isValidAddress(address) {
  // For simplicity, let's require at least 5 characters for the address
  return address.length >= 5;
}

// Main function to validate the form
function validateForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var creditCard = document.getElementById("creditCard").value;

  // Simple validation for empty fields
  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    address === "" ||
    creditCard === ""
  ) {
    alert("Please fill out all fields");
    return false;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  // Validate address format
  if (!isValidAddress(address)) {
    alert("Please enter a valid address");
    return false;
  }

  // If all validations pass, you can proceed with form submission
  // Redirect the user to done.html
  window.location.href = "done.html";
  return true;
}
