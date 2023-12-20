
function addPackage() {
    // Get input values
    const packageName = document.getElementById('packageName').value;
    const packageSpeed = document.getElementById('packageSpeed').value;
    const packagePrice = document.getElementById('packagePrice').value;
    const realpackagePrice = document.getElementById('realpackagePrice').value;
    const packageDescription = document.getElementById('packageDescription').value;
    const recommended = document.getElementById('recommendedCheckbox').checked;
    // Prepare JSON data
    const packageData = {
        packageName: packageName,
        packageSpeed: packageSpeed,
        packagePrice: packagePrice,
        packageDescription: packageDescription,
        recommended: recommended,
        realprice : realpackagePrice
    };

    // Make a PUT request to your addpackage route
    fetch('/addpackage', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(packageData)
    })
        .then(response => response.text())
        .then(data => {
            // Handle the response
            if (data === 'done') {
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Package added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                location.reload();
            } else {
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error adding package',
                    text: 'Please try again later.',
                    confirmButtonColor: '#d33'
                });



            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show a generic error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#d33'
            });
        });
}
// Add a click event handler for the "Edit" button in your JavaScript
$(document).on('click', '.btn-primary[data-toggle="modal"]', function () {
    // Retrieve data attributes from the clicked button
    var packageName = $(this).data('package-name');
    var packageSpeed = $(this).data('package-speed');
    var packagePrice = $(this).data('package-price');
    var packagerealPrice = $(this).data('real-price');
    var packageDescription = $(this).data('package-description');
    var recommended = $(this).data('recommended');  // Retrieve checkbox value

    // Populate modal form fields with the retrieved data
    $('#editpackageName').val(packageName);
    $('#editpackageSpeed').val(packageSpeed);
    $('#editpackagePrice').val(packagePrice);
    $('#editpackagerealPrice').val(packagerealPrice);
    $('#editpackageDescription').val(packageDescription);
    $('#editrecommendedCheckbox').prop('checked', recommended); // Set checkbox value in the modal form
    $('#findmethod').val(packageName);

    // Update button click event for the "Edit Package" button in the modal
    $('#editPackageModal').on('submit', 'form', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Gather updated package information from the modal form
        var updatedPackageName = $('#editpackageName').val();
        var updatedPackageSpeed = $('#editpackageSpeed').val();
        var updatedPackagePrice = $('#editpackagePrice').val();
        var packagerealPrice = $('#editpackagerealPrice').val();
        var updatedPackageDescription = $('#editpackageDescription').val();
        var updatedRecommended = $('#editrecommendedCheckbox').prop('checked'); // Retrieve checkbox value from the modal form
        var findmethod = $('#findmethod').val();

        // Create a data object to be sent as JSON
        var updatedPackageData = {
            name: updatedPackageName,
            speed: updatedPackageSpeed,
            price: updatedPackagePrice,
            description: updatedPackageDescription,
            recommended: updatedRecommended, // Include checkbox value in the data object
            findmethod: findmethod,
            realprice : packagerealPrice
        };

        // Send the updated package information to the backend using the PUT method
        $.ajax({
            url: '/updatepkg',  // Update this with the actual backend route
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedPackageData),
            success: function (response) {
                // Handle success response from the backend
                if (response === 'done') {
                    // Display success message using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Package updated successfully!'
                    });
                    // Close the modal after successful update
                    $('#editPackageModal').modal('hide');
                    setTimeout(() => {
                        location.reload();
                    }, 1000)
                } else {
                    // Display error message using SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update package. Please try again.'
                    });
                }
            },
            error: function (error) {
                // Handle error response from the backend
                console.error('Error updating package:', error);
                // Display error message using SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An unexpected error occurred. Please try again.'
                });
            }
        });
    });
});



// delete package

// Add this function to your JavaScript code
function deletePackage(packageName) {
    // Confirm deletion with the user using SweetAlert
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // If the user confirms, send a request to delete the package
            $.ajax({
                url: '/deletepkg', // Update this with the actual backend route
                method: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ name: packageName }),
                success: function (response) {
                    // Handle success response from the backend
                    if (response === 'done') {
                        // Display success message using SweetAlert
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Package deleted successfully!'
                        });
                        // Reload the page or update the UI as needed
                        location.reload();
                    } else {
                        // Display error message using SweetAlert
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to delete package. Please try again.'
                        });
                    }
                },
                error: function (error) {
                    // Handle error response from the backend
                    console.error('Error deleting package:', error);
                    // Display error message using SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An unexpected error occurred. Please try again.'
                    });
                }
            });
        }
    });
}


