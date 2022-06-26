function getInputUsername() {
    const $inputUsername = document.getElementById("input-username");
    if ($inputUsername.value == "") alert("INGRESA UN USUARIO");
    else return $inputUsername.value;
}

document.addEventListener("click", (event) => {
    if (event.target.matches("#get")) {
        event.preventDefault();
        getData(getInputUsername());
    }
});

async function getData(url) {
    if (url === undefined) return;

    const response = await fetch(`https://api.github.com/users/${url}`),
        json = await response.json();

    const $template = document.querySelector("template"),
        $info = $template.content.cloneNode(true);

    // preview
    $info.querySelector(".user-icon img").src = json.avatar_url || "Unknown";
    $info.querySelector(".username").textContent = json.login || "Unknown";
    $info.querySelector(".followers").textContent = json.followers || "0";
    $info.querySelector(".following").textContent = json.following || "0";
    $info.querySelector(".github").href = json.html_url || "Unknown";
    $info.querySelector(".bio p").textContent = json.bio || "No bio...";

    // details
    $info.querySelector(".login").textContent = json.login || "Unknown";
    $info.querySelector(".name").textContent = json.name || "Unknown";
    $info.querySelector(".email").textContent = json.email || "Unknown";
    $info.querySelector(".twitter").textContent = json.twitter_username || "Unknown";
    $info.querySelector(".location").textContent = json.location || "Unknown";
    $info.querySelector(".company").textContent = json.company || "Unknown";
    $info.querySelector(".repos").textContent = json.public_repos || "0";
    document.querySelector("main").append($info);
}
