function signout(){
    let xhr = new XMLHttpRequest;
    xhr.open('delete','/signout',true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')	;
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					if(xhr.responseText === "done"){
						window.location.href = '/login'
					}
                    else{
						alert("Something went wrong!")
					}
				}
			}
            xhr.send()
}