function updateLabelText(input) {
    const label = input.closest('label'); // Get the parent label element
    const selectedFileNameSpan = document.getElementById('selectedFileName');

    if (input.files.length > 0) {
        const fileName = input.files[0].name;
        selectedFileNameSpan.innerText = `Selected file: ${fileName}`;
    } else {
        selectedFileNameSpan.innerText = ''; // No file selected
    }
}
async function saveChanges() {
	// Retrieve values from input fields
	const newPasswordValue = document.getElementById('newPassword').value;
	const repeatNewPasswordValue = document.getElementById('repeatNewPassword').value;
  
	if (newPasswordValue === repeatNewPasswordValue) {
	  const bioValue = document.getElementById('bio').value;
	  const birthdateValue = document.getElementById('birthdate').value;
	  const phoneValue = document.getElementById('phone').value;
	  const whatsappValue = document.getElementById('whatsapp').value;
	  const nameValue = document.getElementById('name').value;
	  const emailValue = document.getElementById('email').value;
	  const packageValue = document.getElementById('package').value;
	  const currentPasswordValue = document.getElementById('currentPassword').value;
	  const file = document.getElementById('pic').files[0];
  
	  const formData = new FormData();
	  formData.append('newPassword', newPasswordValue);
	  formData.append('repeatNewPassword', repeatNewPasswordValue);
	  formData.append('bio', bioValue);
	  formData.append('birthdate', birthdateValue);
	  formData.append('phone', phoneValue);
	  formData.append('whatsapp', whatsappValue);
	  formData.append('name', nameValue);
	  formData.append('email', emailValue);
	  formData.append('package', packageValue);
	  formData.append('currentPassword', currentPasswordValue);
	  formData.append('file', file);
  
	  try {
		const response = await fetch('/updateprofile', {
		  method: 'PUT',
		  body: formData,
		});
  
		if (response.ok) {
		  const result = await response.text();
		  if (result === 'done') {
			Swal.fire({
			  icon: 'success',
			  title: 'Successfully Updated!',
			  showConfirmButton: false,
			  timer: 2000,
			}).then(() => {
			  location.reload();
			});
		  } else if (result === 'invalid') {
			Swal.fire({
			  icon: 'error',
			  title: 'Wrong Password!',
			});
		  } else {
			Swal.fire({
			  icon: 'error',
			  title: 'Something went wrong!',
			});
		  }
		} else {
		  Swal.fire({
			icon: 'error',
			title: 'Something went wrong with the request!',
		  });
		}
	  } catch (error) {
		console.error('Error:', error);
		Swal.fire({
		  icon: 'error',
		  title: 'An error occurred while processing your request.',
		});
	  }
	} else {
	  Swal.fire({
		icon: 'error',
		title: 'Repeat Password does not match!',
	  });
	}
  }
  
  

  function emailenter(){
	location.reload();
  }

  $(document).ready(function () {
	// Function to hide the "Save Changes" button when the "Status" tab is active
	function toggleSaveChangesButton() {
		var statusTabLink = $('[href="#status"]');
		var saveChangesButton = $('#saveChangesButton');
		var updateStatusButton = $('#updateStatusButton')

		// Check if the "Status" tab is active
		if (statusTabLink.hasClass('active')) {
			saveChangesButton.hide(); // Hide the button
			updateStatusButton.show();
		} else {
			saveChangesButton.show(); // Show the button
			updateStatusButton.hide();
		}
	}

	// Initial call to hide/show the button based on the initial state
	toggleSaveChangesButton();

	// Add an event listener to detect tab changes
	$('[data-toggle="list"]').on('shown.bs.tab', toggleSaveChangesButton);
});

function updateUserStatus(email) {
	const lastMonthUsage = document.getElementById('lastmonthusage').value;
	const totalUsage = document.getElementById('totalusage').value;
	const wallet = document.getElementById('wallet').value;
	const deposit = document.getElementById('deposit').value;
	const pending = document.getElementById('pending').value;
	const totalBill = document.getElementById('totalbill').value;
	const paid = document.getElementById('paid').value;
  
	// Create an object with the data
	const userData = {
	  lastmonthusage: lastMonthUsage,
	  totalusage: totalUsage,
	  wallet: wallet,
	  deposit: deposit,
	  pending: pending,
	  totalbill: totalBill,
	  paid: paid,
	  email: email,
	};
  
	// Fetch API to send the data as JSON
	fetch('/updateuserstatus', {
	  method: 'put',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(userData),
	})
	  .then(response => response.text())
	  .then(data => {
		if (data === 'done') {
		  Swal.fire({
			icon: 'success',
			title: 'Successfully Updated!',
			showConfirmButton: false,
			timer: 2000,
		  });
		} else {
		  Swal.fire({
			icon: 'error',
			title: 'Update failed. Please check the data and try again.',
		  });
		}
	  })
	  .catch(error => {
		console.error('Error:', error);
		Swal.fire({
		  icon: 'error',
		  title: 'An error occurred. Please try again later.',
		});
	  });
  }
  


  document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach((button )=> {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);

            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;


        });
    });
});

