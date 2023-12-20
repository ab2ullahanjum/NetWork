document.addEventListener('DOMContentLoaded', function () {
    const addDepositMethodForm = document.getElementById('addDepositMethodForm');

    addDepositMethodForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get input values
        const methodName = document.getElementById('methodName').value;
        const methodAccountNumber = document.getElementById('methodAccountNumber').value;
        const methodAccountHolder = document.getElementById('methodAccountHolder').value;
        const methodImageInput = document.getElementById('methodImage');
        const recommended = document.getElementById('recommendedCheckbox').checked;

        // Prepare FormData to include file
        const formData = new FormData();
        formData.append('methodName', methodName);
        formData.append('methodAccountNumber', methodAccountNumber);
        formData.append('methodAccountHolder', methodAccountHolder);
        formData.append('recommended', recommended);
        formData.append('file', methodImageInput.files[0]);

        // Make a POST request to your add deposit method route
        fetch('/adddepositmethod', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                // Handle the response
                if (data === 'done') {
                    // Show success message
                    Swal.fire({
                        icon: 'success',
                        title: 'Deposit method added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    location.reload();
                } else {
                    // Show error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Error adding deposit method',
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
    });
});




$(document).on('click', '.btn-primary[data-toggle="modal"]', function () {
    // Retrieve data attributes from the clicked button
    var methodName = $(this).data('method-name');
    var accountNumber = $(this).data('account-number');
    var accountHolder = $(this).data('account-holder');
    var recommended = $(this).data('recommended'); // Assuming you have a data attribute for recommended

    // Populate modal form fields with the retrieved data
    $('#editMethodName').val(methodName);
    $('#editMethodAccountNumber').val(accountNumber);
    $('#editMethodAccountHolder').val(accountHolder);
    $('#editrecommendedCheckbox').prop('checked', recommended);
    $('#findmethod').val(methodName);
    // Update button click event for the "Edit Deposit Method" button in the modal
    $('#editDepositMethodModal').on('submit', 'form', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Gather updated deposit method information from the modal form
        var findmethod = $('#findmethod').val().trim();
        var updatedMethodName = $('#editMethodName').val().trim();
        var updatedAccountNumber = $('#editMethodAccountNumber').val();
        var updatedAccountHolder = $('#editMethodAccountHolder').val();
        var updatedRecommended = $('#editrecommendedCheckbox').prop('checked');
        // Create a FormData object to handle file uploads
        var formData = new FormData();
        formData.append('findmethod', findmethod);
        formData.append('name', updatedMethodName);
        formData.append('accountNumber', updatedAccountNumber);
        formData.append('accountHolderName', updatedAccountHolder);
        formData.append('recommended', updatedRecommended);
        formData.append('file', $('#editMethodImage')[0].files[0]);

        // Send the updated deposit method information to the backend using the PUT method
        $.ajax({
            url: '/updatedepositmethod', // Update this with the actual backend route
            method: 'PUT',
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                // Handle success response from the backend
                if (response === 'done') {
                    // Display success message using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Deposit method updated successfully!'
                    });
                    // Close the modal after a successful update
                    $('#editDepositMethodModal').modal('hide');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    // Display error message using SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update deposit method. Please try again.'
                    });
                }
            },
            error: function (error) {
                // Handle error response from the backend
                console.error('Error updating deposit method:', error);
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


function deleteDepositMethod(depositmethodname) {
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
                url: '/deletedepositmethod', // Update this with the actual backend route
                method: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ name: depositmethodname }),
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




//deposit requests

var username, useremail, depositamount, methodname, accountnumber, accountholder, trxid, imageupload;

$(document).ready(function () {
    // Handle click event on tr elements with the class "clickable-row"
    $('.clickable-row').click(function () {
        // Retrieve data attributes from the clicked row
        username = $(this).data('username');
        useremail = $(this).data('useremail');
        depositamount = $(this).data('depositamount');
        methodname = $(this).data('methodname');
        accountnumber = $(this).data('accountnumber');
        accountholder = $(this).data('accountholder');
        trxid = $(this).data('trxid');
        imageupload = $(this).data('imageupload');

        // Update the modal content with the retrieved data
        $('#modal-username').text(username);
        $('#modal-useremail').text(useremail);
        $('#modal-depositamount').text(depositamount);
        $('#modal-methodname').text(methodname);
        $('#modal-accountnumber').text(accountnumber);
        $('#modal-accountholder').text(accountholder);
        $('#modal-trxid').text(trxid);

        // Update the image source
        $('#modal-image').attr('src', imageupload);
    });
});



async function acceptreq() {
    try {
        // Ask the user for confirmation using SweetAlert2
        const userConfirmed = await Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: 'Do you want to accept the request?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        });

        // If the user didn't confirm, exit the function
        if (!userConfirmed.value || userConfirmed.dismiss === Swal.DismissReason.cancel) {
            return;
        }

        let acceptbutton = document.getElementById('acceptbutton');
        let buttonText = document.getElementById('button-text');
        let loadingSpinner = document.getElementById('loading-spinner');

        // Disable button to prevent multiple clicks
        acceptbutton.disabled = true;

        // Show loading spinner and apply blur effect
        acceptbutton.classList.add('loading-blur');
        buttonText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';

        const response = await fetch('/acceptreq', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail,
                depositamount,
            }),
        });

        // Enable button and reset state
        acceptbutton.disabled = false;
        acceptbutton.classList.remove('loading-blur');
        buttonText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';

        acceptbutton.innerHTML = 'Accept';

        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error processing request');
        }

        toastr.success('Request accepted successfully');
        location.reload();
    } catch (error) {
        // Enable button and reset state on error
        document.getElementById('acceptbutton').disabled = false;
        document.getElementById('loading-spinner').style.display = 'none';
        document.getElementById('acceptbutton').classList.remove('loading-blur');

        // Handle errors
        console.error(error);
        // Show a Swal (SweetAlert) modal with the error message
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'An error occurred',
        });
    }
}





async function rejectreq() {
    try {
        // Ask the user for confirmation using SweetAlert2
        const userConfirmed = await Swal.fire({
            icon: 'question',
            title: 'Are you sure?',
            text: 'Do you want to Reject the request?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        });

        // If the user didn't confirm, exit the function
        if (!userConfirmed.value || userConfirmed.dismiss === Swal.DismissReason.cancel) {
            return;
        }


        const response = await fetch('/rejectreq', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail,
                depositamount,
            }),
        });
;

        if (!response.ok) {
            // Handle error response
            const errorData = await response.text();
            throw new Error(errorData.message || 'Error processing request');
        }

        toastr.success('Request rejected successfully');
        location.reload();
    } catch (error) {


        // Handle errors
        console.error(error);
        // Show a Swal (SweetAlert) modal with the error message
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'An error occurred',
        });
    }
}

