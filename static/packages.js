$(document).ready(function () {
  // Triggered when the modal is about to be shown
  $('#activatePackageModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var packageName = button.data('package-name');
    var packageSpeed = button.data('package-speed');
    var packagePrice = button.data('package-price');
    var packageDescription = button.data('package-description');
    var recommended = button.data('recommended');

    // Update modal content with the data
    $('#packageName').val(packageName);
    $('#packageSpeed').val(packageSpeed);
    $('#packagePrice').val(packagePrice);
    $('#packageDescription').val(packageDescription);
    $('#recommended').val(recommended ? 'Yes' : 'No');
  });

  // Disable input fields on focus
  $('#activatePackageModal input[readonly]').on('focus', function (event) {
    event.preventDefault();
  });


});


activateButton.addEventListener('click', function () {
  // Display a confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to activate this package.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, activate it!'
  }).then(async function (result) {
    // If the user clicks 'Yes'
    if (result.isConfirmed) {
      try {
        // Extract data from modal input fields
        var packageName = document.getElementById('packageName').value;
        var packageSpeed = document.getElementById('packageSpeed').value;
        var packagePrice = document.getElementById('packagePrice').value;
        var packageDescription = document.getElementById('packageDescription').value;
        var recommended = document.getElementById('recommended').value;

        // Make a PUT request to the activatepkg route with modal data
        var response = await fetch('/activatepkg', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            packageName: packageName,
            packageSpeed: packageSpeed,
            packagePrice: packagePrice,
            packageDescription: packageDescription,
            recommended: recommended,
            // Add any other data you need to send to the server
          }),
        });

        // Check if the response status is OK (200)
        if (response.ok) {
          // Parse JSON response
          var responseData = await response.text();

          // Check if the response is 'done'
          if (responseData === 'done') {
            // Handle the success response
            Swal.fire('Activated!', 'Your package has been activated.', 'success');
            location.reload();
          } else if (responseData === 'invalid') {
            // Handle invalid response (e.g., insufficient balance)
            Swal.fire('Error!', 'Insufficient balance.', 'error');
          } else {
            // Handle other response cases
            Swal.fire('Error!', 'An error occurred while activating the package.', 'error');
          }
        } else {
          // Handle non-OK response
          var errorText = await response.text();
          throw new Error('Non-OK response: ' + errorText);
        }
      } catch (error) {
        // Handle the error response
        Swal.fire('Error!', 'An error occurred while activating the package. ' + error.message, 'error');
      }
    }
  });
});