"use strict"

let currentTheme

(function() {
    const theme = localStorage.getItem("theme")
    if (theme) {
        currentTheme = theme == "dark" ? 0 : 1
    } else {
        currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 0 : 1
        localStorage.setItem("theme", currentTheme == 0 ? "dark" : "light")
    }
})()

window.addEventListener("DOMContentLoaded", () => {        
    currentTheme = !currentTheme
    changeTheme()

    document.getElementById("themeBtn").addEventListener("click", () => {
        changeTheme()
    })
})

const changeTheme = () => {
    currentTheme = !currentTheme

    setThemeColor(currentTheme)
    setThemeIcon(currentTheme)
}

const setThemeColor = theme => {
    document.body.setAttribute("data-bs-theme", theme == 0 ? "dark" : "light")
    localStorage.setItem("theme", theme == 0 ? "dark" : "light")
}

const setThemeIcon = theme => {
    const iconNode = document.getElementById("themeBtn").children[0]
    iconNode.classList.remove("bi-sun-fill", "bi-moon-fill")
    iconNode.classList.add(theme == 1 ? "bi-sun-fill" : "bi-moon-fill")
}
