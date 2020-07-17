const token = localStorage.getItem("token");
const loggedInUserID = parseInt(localStorage.getItem("loggedInUserID"));

if (token === null || isNaN(loggedInUserID)) {
    window.location = "/"
}
else {
    $.ajax({
        headers: { 'authorization': 'Bearer ' + token },
        url: 'http://localhost:8081/users/admin',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            // Do nothing
        },
        error: function (xhr, textStatus, errorThrown) {
            window.location = "/"
        }
    });
}  
