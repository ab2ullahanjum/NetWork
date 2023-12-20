function deleteuser(email,name) {
    // Use SweetAlert for confirmation
    Swal.fire({
        title: 'Are you sure to delete '+name+'?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // If the user confirms, proceed with the deletion
            fetch('/deleteuser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({ email : email }),
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Something went wrong!');
                }
            })
            .then(data => {
                if (data === 'done') {
                    // Display success message using SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'User Successfully Deleted!',
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    // Display error message using SweetAlert
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Display error message using SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'An unexpected error occurred. Please try again.',
                });
            });
        }
    });
}

$(document).ready(function () {
    $('#search-form').submit(function (event) {
        console.log("hello")
        event.preventDefault();
        const query = $('#search-input').val();

        $.ajax({
            url: `/search?q=${query}`,
            method: 'GET',
            success: function (data) {
                // Clear existing table rows
                $('#user-table tbody').empty();

                // Append new rows based on the response data
                data.forEach(function (user) {
                    const newRow = `<tr>
                        <td>
                            <img src="${user.profile}" alt="">
                            <span class="user-subhead">${user.name}</span>
                        </td>
                        <td>${user.date}</td>
                        <td class="text-center">
                            <span class="label label-default">${user.pkg}</span>
                        </td>
                        <td>${user.email}</td>
                        <td style="width: 20%;">
                            <a class="table-link text-info" href="/users/${user.email}">
                                <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            <a class="table-link danger" onclick="deleteuser('${user.email}','${user.name}')">
                                <span class="fa-stack">
                                    <i class="fa fa-square fa-stack-2x"></i>
                                    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </td>
                    </tr>`;
                    $('#user-table tbody').append(newRow);
                });
            },
            error: function (error) {
                console.error(error);
            },
        });
    });
});
