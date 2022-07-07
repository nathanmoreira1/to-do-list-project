document.querySelector(".button").addEventListener("click", () => {
    document.querySelector(".button").innerHTML = "Saving..."
    setTimeout(() => {
        document.querySelector(".button").innerHTML = "Save"
    }, 500);
});