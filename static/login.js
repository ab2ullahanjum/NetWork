function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000, // Duration in milliseconds
        close: true,
        gravity: 'bottom', // 'top' or 'bottom'
        position: 'center', // 'left', 'center', or 'right'
        backgroundColor: type === 'success' ? '#4CAF50' : '#FF6347', // Green for success, red for error
    }).showToast();
}


function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(responseText => {
            if (responseText === 'done') {
                // Use Swal.fire for success
                showToast('Login successful!', 'success');
                    window.location.href = '/dashboard';
                
            } else if (responseText === 'invalid') {
                // Use Swal.fire for invalid login details
                showToast('Invalid Login Details', 'error');
            } else {
                // Use Swal.fire for other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!',
                });
            }
        })
        .catch(error => {
            // Use Swal.fire for fetch errors
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Fetch error: ' + error.message,
            });
            console.error('Fetch error:', error);
        });
}
