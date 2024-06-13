function signup() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "") {
        alert("Veuillez entrer votre pseudo.");
        return;
    }

    if (password === "") {
        alert("Veuillez entrer votre mot de passe.");
        return;
    }

    var savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
        var userData = JSON.parse(savedUserData);
        if (userData.username === username) {
            document.getElementById("error-message").style.display = "block";
            return;
        }
    }

    var userData = {
        username: username,
        password: password
    };
    localStorage.setItem("userData", JSON.stringify(userData)); // Stocker le pseudo dans le localStorage

    window.location.href = "index.html";
}
