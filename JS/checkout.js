function validateForm() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var creditCard = document.getElementById("creditCard").value;

  // Simple validation for demonstration purposes
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

  // You can add more specific validation logic for each field (e.g., email format, credit card format)

  // If all fields are valid, you can proceed with form submission
  return true;
}
