$(document).ready(function(){





$("#loginBtn").click(function () {

    let username = $("#username").val().trim();
    let password = $("#password").val();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let loggedUser = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (loggedUser) {

        localStorage.setItem("user", JSON.stringify(loggedUser));

sessionStorage.setItem("showWelcome", "true");

window.location = "shop.html";

        $("#message").html(`
            <div class="alert alert-success">
                Login successful!
            </div>
        `);

        setTimeout(function () {
            window.location = "shop.html";
        }, 1000);

    } else {

        $("#message").html(`
            <div class="alert alert-danger">
                Incorrect username or password.
            </div>
        `);

    }

});


$("#signupBtn").click(function () {

    let username = $("#username").val().trim();
    let password = $("#password").val();

    if (username === "" || password === "") {
        $("#message").html(`
            <div class="alert alert-warning">
                Please enter username and password.
            </div>
        `);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(u => u.username === username);

    if (existingUser) {
        $("#message").html(`
            <div class="alert alert-danger">
                Username already exists.
            </div>
        `);
        return;
    }

    let newUser = {
        username: username,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    $("#message").html(`
        <div class="alert alert-success">
            Account created successfully!
        </div>
    `);
});



});