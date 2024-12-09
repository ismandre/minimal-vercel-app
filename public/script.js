let rockName = "";

function setName() {
    const nameInput = document.getElementById("rock-name").value;
    if (!nameInput) return alert("Please enter a name!");
    rockName = nameInput;

    fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rockName }),
    }).then(() => loadApp());
}

function loadApp() {
    fetch("/api/stats")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("name-prompt").classList.add("hidden");
            document.getElementById("main-app").classList.remove("hidden");
            document.getElementById("rock-name-display").textContent = data.name;
            document.getElementById("hunger").textContent = data.hunger;
            document.getElementById("energy").textContent = data.energy;
            document.getElementById("happiness").textContent = data.happiness;
        });
}

function interact(action) {
    fetch(`/api/${action}`, { method: "POST" })
        .then((res) => res.json())
        .then(loadApp);
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/stats")
        .then((res) => {
            if (res.ok) loadApp();
            else document.getElementById("name-prompt").classList.remove("hidden");
        });
});

