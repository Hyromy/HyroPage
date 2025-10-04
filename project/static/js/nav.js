"use strict"

window.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector("nav")
    let lastScrollY = window.scrollY

    window.addEventListener('scroll', () => {
        const navHeight = nav.offsetHeight
        const currentScrollY = window.scrollY

        if (currentScrollY > navHeight) {
            if (lastScrollY < currentScrollY) {
                nav.classList.add("nav-hide")
            } else {
                nav.classList.remove("nav-hide")
            }
        } else {
            nav.classList.remove("nav-hide")
        }

        lastScrollY = currentScrollY
    })
})
