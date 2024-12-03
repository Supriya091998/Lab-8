function validateForm() {
    // Get form inputs
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Clear previous status
    document.getElementById('formStatus').innerHTML = '';
    document.getElementById('passwordStrength').innerHTML = '';

    // Check if any fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return false;
    }

    // Validate first and last name (only characters allowed)
    if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
        alert("First and Last names should only contain letters.");
        return false;
    }

    // Validate email (simple regex for domain check)
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Password match check
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Prevent SQL Injection and XSS by sanitizing input
    firstName = sanitizeInput(firstName);
    lastName = sanitizeInput(lastName);
    email = sanitizeInput(email);
    password = sanitizeInput(password);
    confirmPassword = sanitizeInput(confirmPassword);

    // Show success popup
    alert('Form created successfully!');
    
    // Optionally, reset the form after success
    document.getElementById("registrationForm").reset();

    return false;  // Prevent actual form submission for demonstration purposes
}

// Function to sanitize user input and prevent XSS/SQLi
function sanitizeInput(input) {
    // Basic sanitization by replacing common harmful characters
    return input.replace(/<[^>]*>/g, "").replace(/['";=()&]/g, "");
}

// Password strength checker
function checkPasswordStrength() {
    let password = document.getElementById('password').value;
    let strengthMessage = document.getElementById('passwordStrength');

    let strength = 'Weak';
    let color = 'red';

    // Check password strength using regex patterns
    if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[\W_]/.test(password)) {
        strength = 'Strong';
        color = 'green';
    } else if (password.length >= 6) {
        strength = 'Moderate';
        color = 'orange';
    }

    strengthMessage.innerHTML = `Password strength: ${strength}`;
    strengthMessage.style.color = color;
}
