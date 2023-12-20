function updatesite() {
    var formData = new FormData();

    // Append form fields
    formData.append('sitename', document.getElementById('sitename').value);
    formData.append('sitedescription', document.getElementById('sitedescription').value);
    formData.append('whatwedo', document.getElementById('whatwedo').value);
    formData.append('whoweare', document.getElementById('whoweare').value);
    formData.append('notice', document.getElementById('notice').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('info', document.getElementById('info').value);
    formData.append('find','find')
    // Append file inputs
    formData.append('logo', document.getElementById('sitelogo').files[0]);
    formData.append('favicon', document.getElementById('sitefavicon').files[0]);

    // Append links
    formData.append('links[youtube]', document.getElementById('youtube').value);
    formData.append('links[facebook]', document.getElementById('facebook').value);
    formData.append('links[linkedin]', document.getElementById('linkedin').value);
    formData.append('links[twitter]', document.getElementById('twitter').value);
    formData.append('links[github]', document.getElementById('github').value);
    formData.append('links[instagram]', document.getElementById('instagram').value);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/updatesite', true);

    // Do not set Content-Type here; let the browser set it automatically for FormData

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText === "done") {
                Swal.fire({
                    title: "Done!",
                    text: "Site Successfully Updated!",
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
    };

    xhr.send(formData);
}

