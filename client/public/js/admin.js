if (localStorage.getItem("token") === null || localStorage.getItem("userid") === null || !localStorage.getItem("username")) {
    window.location.href  = "/error";
}
else {
    $.ajax({
        headers: { 'authorization': 'Bearer ' + localStorage.getItem("token")},
        url: 'http://localhost:8081/users/admin',
        type: 'POST',
        success: function () {
            // Do nothing
        },
        error: function () {
            window.location.href = "/error";
        }
    });
}  

$(".username").prepend(localStorage.getItem("username"));