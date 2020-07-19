if (localStorage.getItem("token") === null || !localStorage.getItem("username")) {
    window.location = "/"
}
else {
    $.ajax({
        headers: { 'authorization': 'Bearer ' + localStorage.getItem("token")},
        url: 'http://localhost:8081/users/admin',
        type: 'POST',
        success: function (data, textStatus, xhr) {
            // Do nothing
        },
        error: function (xhr, textStatus, errorThrown) {
            window.location = "/"
        }
    });
}  

$(".username").prepend(localStorage.getItem("username"));