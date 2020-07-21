const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

if (token === null || !username) {
    $(".cta").replaceWith(`<li class="nav-item active cta"><a href="/login" class="nav-link">Login</a></li>`)
}
else {
    $(".cta").replaceWith(`<li class="nav-item active cta"><a href="" class="nav-link" id="logout">Logout</a></li>`)
}

$('#logout').on('click', function () {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
});
