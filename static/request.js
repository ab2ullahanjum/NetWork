// Function to handle approval
async function approveRequest(name,email) {

  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to approve the request.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, approve it!'
  });

  if (confirmResult.isConfirmed) {
    try {
      // Call your backend API to handle approval logic using the provided email
      const response = await fetch('/approverequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:name,
          email:email
        }
          ),
      });

      if (response.ok) {
        // Get the response data
        const responseData = await response.json();

        // Use the response data in the success message or for further processing
        Swal.fire({
          icon: 'success',
          title: 'Request Approved! (User Created)',
          text: `Login Details : 
          Email : ${responseData.email} , Password : 123456`, // Replace with the actual property from the response data
          showConfirmButton: false,
          timer: 10000,
        }).then(()=>{
          location.reload();
        });

        // You may want to update the UI or reload data after successful approval
      } else {
        // Error message for fetch failure in approval
        Swal.fire({
          icon: 'error',
          title: 'Error Approving Request!',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Error message for fetch failure in any step
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while processing your request.',
      });
    }
  }
}


  
  // Function to handle disapproval
  async function disapproveRequest(email) {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to disapprove the request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disapprove it!'
    });
  
    if (confirmResult.isConfirmed) {
      // Call your backend API to handle disapproval logic using the provided email
      try {
        const response = await fetch(`/disapproverequest`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email:email}),
        });
  
        if (response.ok) {
          // Success message
          Swal.fire({
            icon: 'success',
            title: 'Request Disapproved!',
            showConfirmButton: false,
            timer: 2000,
          }).then(()=>{
            location.reload();
          });
          // You may want to update the UI or reload data after successful disapproval
        } else {
          // Error message
          Swal.fire({
            icon: 'error',
            title: 'Error Disapproving Request!',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        // Error message for fetch failure
        Swal.fire({
          icon: 'error',
          title: 'An error occurred while processing your request.',
        });
      }
    }
  }
  