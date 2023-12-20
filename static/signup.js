function register() {
    let xhr = new XMLHttpRequest;
    xhr.open('POST', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText === "done") {
                Swal.fire({
                    title: "Done!",
                    text: "Your request has been successfully submitted!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error"
                });
            }
        }
    }
    xhr.send(JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,

    }))
}
//view password 
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eye-icon');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    // Change the eye icon based on the password visibility
    eyeIcon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});


//form validation


let isFormValid = true;
 
    

    function validateName() {
        let name = document.getElementById('name');
        if (name.value.trim() === '') {
            updateValidationStatus(name, false);
        } else {
            updateValidationStatus(name, true);
        }
    }

    async function validateEmail() {
        let email = document.getElementById('email');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(email.value)) {
            updateValidationStatus(email, false);
        } else {
            const emailExists = await checkEmailExists(email.value);
            updateValidationStatus(email, !emailExists);
        }
    }
    
    async function checkEmailExists(email) {
        try {
            const response = await fetch('/checkemail', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
    
            if (response.ok) {
                const data = await response.json();
                return data.exists; // Directly return the boolean value
            } else {
                console.error('Error checking email existence:', response.statusText);
            }
        } catch (error) {
            console.error('Error checking email existence:', error.message);
        }
    }
    

    function validatePassword() {
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirmpassword');
        if (password.value.length < 8) {
            updateValidationStatus(password, false);
            updateValidationStatus(confirmPassword, false);
        } else {
            updateValidationStatus(password, true);
            updateValidationStatus(confirmPassword, true);
        }
    }

    function validateConfirmPassword() {
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirmpassword');
        if (password.value !== confirmPassword.value || password.value.length < 8) {
            updateValidationStatus(password, false);
            updateValidationStatus(confirmPassword, false);
        } else {
            updateValidationStatus(password, true);
            updateValidationStatus(confirmPassword, true);
        }
    }

    function validateTermsCheckbox() {
        let termsCheckbox = document.getElementById('check1');
        if (!termsCheckbox.checked) {
            updateValidationStatus(termsCheckbox, false);
        } else {
            updateValidationStatus(termsCheckbox, true);
        }
    }

    function updateValidationStatus(element, isValid) {
        if (isValid) {
            element.classList.remove('is-invalid');
            element.classList.add('is-valid');
        } else {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
            isFormValid = false; // Set form validity to false if any field is invalid
        }
    }
 


    function validateForm() {
    validateName();
    validateEmail();
    validatePassword();
    validateTermsCheckbox();
    validateConfirmPassword();
    return isFormValid;
}

function submitform() {
    if (validateForm()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmpassword').value;
        var profilePicture = document.getElementById('profilePicture').files[0];
    
        var formData = new FormData();
        var currentDate = new Date(Date.now());
        var formattedDate = currentDate.toISOString();
        console.log(formattedDate)
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('file', profilePicture);
        formData.append('date',formattedDate);
        
    
        let xhr = new XMLHttpRequest;
        xhr.open('POST', '/register', true);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (xhr.responseText ==='done') {
                    window.location.href = '/dashboard';
                } else {
                    console.log("Something Went worng!")
                }
            }
        }
    
        xhr.send(formData);
    } else {
        alert('Please fill in all required fields correctly.');
    }
}








