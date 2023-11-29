const api = "https://reqres.in";
const token = "QpwL5tke4Pnpja7X4";

// Button whose response to send data
let submitBtn = document.getElementById("btn-login");

const loginSuccessful = async (email, password) => {
  submitBtn.textContent = "loading..";
  submitBtn.disabled = true;
  try {
    const response = await fetch(`${api}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Use the function arguments here
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized! Please check your email or password");
      } else if (response.status === 400 || response.status === 500) {
        throw new Error("Unauthorized! Please check your email or password");
      } else {
        throw new Error("Unexpected error occurred");
      }
    }

    // Process the response here (e.g., check if login was successful)
    const data = await response.json();

    // If the login was successful, set the token in localStorage
    localStorage.setItem("Token", token);

    // Show an alert message indicating successful login
    alert("Login successful!");

    //navigate into home page
    window.location.href = "index.html"; // Replace "main-page.html" with the URL of your main page
  } catch (error) {
    alert(error.message);
  }
};

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // The input fields
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("Password").value;
  if (!emailValue || !passwordValue) {
    alert("Please provide your email and password");
    return;
  }
  loginSuccessful(emailValue, passwordValue);
});
