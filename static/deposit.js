$(document).ready(function () {
    $('.show-details-btn').click(function () {
        // Get data attributes from the clicked button
        var methodName = $(this).data('method-name');
        var accountNumber = $(this).data('account-number');
        var accountHolder = $(this).data('account-holder');

        // Set modal content based on data attributes
        $('#methodName').text(methodName);
        $('#accountNumber').text(accountNumber);
        $('#accountHolder').text(accountHolder);


        // Show the modal
        $('#depositRequestModal').modal('show');
    });

    $('#depositRequestForm').submit(function (event) {
        event.preventDefault();
    
        // Collect data from form inputs
        var methodName = $('#methodName').text();
        var accountNumber = $('#accountNumber').text();
        var accountHolder = $('#accountHolder').text();
        var depositAmount = $('#depositAmount').val();
        var imageUpload = $('#imageUpload')[0].files[0]; // Get the file input element
        var trxId = $('#trxId').val();
       
        // Create a FormData object to send the file as part of the request
        var formData = new FormData();
        formData.append('methodName', methodName);
        formData.append('accountNumber', accountNumber);
        formData.append('accountHolder', accountHolder);
        formData.append('depositAmount', depositAmount);
        formData.append('file', imageUpload);
        formData.append('trxId', trxId);

    
        // Make AJAX request to the /depositrequest route
        $.ajax({
            url: '/depositrequest',
            type: 'POST',
            data: formData,
            processData: false,  // Prevent jQuery from processing the data
            contentType: false,  // Set content type to false to prevent jQuery from setting the Content-Type header
            success: function (response) {
                // Display SweetAlert2 alert with the response
                Swal.fire({
                    icon: 'success',
                    title: 'Deposit Request Submitted!',
                    text: response.message,
                });
                // Close the modal after successful submission
                $('#depositRequestModal').modal('hide');
                location.reload()
            },
            error: function (error) {
                // Display SweetAlert2 alert for errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while submitting the deposit request.' + error,
                });
            }
        });
    });
});    
