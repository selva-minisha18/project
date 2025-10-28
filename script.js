const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  let isValid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;
  const gender = document.querySelector('input[name="gender"]:checked');

  // Name validation
  if (!/^[A-Za-z ]{3,}$/.test(fullname)) {
    setError("fullname", "Full name must contain at least 3 letters.");
    isValid = false;
  }

  // Username validation
  if (!/^[A-Za-z0-9]{5,15}$/.test(username)) {
    setError("username", "Username must be 5–15 alphanumeric characters.");
    isValid = false;
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Enter a valid email address.");
    isValid = false;
  }

  // Password validation
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
    setError("password", "Password must be 8+ chars, include upper, lower, number & special char.");
    isValid = false;
  }

  // Confirm password
  if (confirmPassword !== password) {
    setError("confirmPassword", "Passwords do not match.");
    isValid = false;
  }

  // Phone (optional)
  if (phone && !/^\d{10}$/.test(phone)) {
    setError("phone", "Phone must be 10 digits.");
    isValid = false;
  }

  // Gender
  if (!gender) {
    setError("dob", "Please select a gender.");
    isValid = false;
  }

  // DOB (18+)
  if (!isAdult(dob)) {
    setError("dob", "You must be at least 18 years old.");
    isValid = false;
  }

  // Terms
  if (!terms) {
    setError("terms", "You must agree to the terms.");
    isValid = false;
  }

  if (isValid) {
    successMessage.classList.remove("hidden");
    form.reset();
    setTimeout(() => successMessage.classList.add("hidden"), 3000);
  }
});

function setError(id, message) {
  document.querySelector(`#${id} + .error`).textContent = message;
}

function isAdult(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}
