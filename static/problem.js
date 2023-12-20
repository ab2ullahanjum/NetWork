document.addEventListener("DOMContentLoaded", function () {
    // User-specific actions
    document.getElementById("submitRequest").addEventListener("click", function () {
        // Handle submit request logic
        var problemTitle = document.getElementById("problemTitle").value;
        var problemDescription = document.getElementById("problemDescription").value;

        // Validate if fields are not empty
        if (problemTitle.trim() === '' || problemDescription.trim() === '') {
            // Show a SweetAlert2 error notification
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill out both title and description fields.'
            });
        } else {
            // Perform the fetch request
            fetch('/reportproblem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: problemTitle,
                    description: problemDescription,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit request. Please try again.');
                }
                // Show a SweetAlert2 success notification
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Request submitted successfully!'
                });

                // Clear the form fields
                document.getElementById("problemTitle").value = '';
                document.getElementById("problemDescription").value = '';
            })
            .catch(error => {
                // Show a SweetAlert2 error notification
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            });
        }
    });
});


// ... (existing script code) ...

function confirmDelete(email, title) {
    // Use SweetAlert2 to confirm the deletion
    Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete the request with title: ${title}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, make the delete request
            deleteProblem(email, title);
        }
    });
}

function deleteProblem(email, title) {
    // Use fetch to make the delete request
    fetch('/deleteproblem', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            title
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete request. Please try again.');
        }
        // Show a SweetAlert2 success notification
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Request deleted successfully!'
        });
      location.reload({});
    })
    .catch(error => {
        // Show a SweetAlert2 error notification
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    });
}
