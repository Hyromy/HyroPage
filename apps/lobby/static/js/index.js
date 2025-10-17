"use strict"

import { Drawer } from "/static/js/classes/Drawer.js"
const drawer = new Drawer()

let CAROUSEL_INNER

let carouselWidth = 0
let cardWidth = 0
let scrollPosition = 0
let step = 0

window.addEventListener("DOMContentLoaded",  async () => {
    const SECTION = document.getElementById("reposArt")
    
    const response = await fetch(
        window.location.origin + "/this/get-repos/",
        {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
    )

    const data = await response.json()
    
    if (data.length == 0 || data.error != null) return
    SECTION.append(drawer.carousel("reposCarousel"))

    const fragment = document.createDocumentFragment()
    data.forEach((repo, i) => {
        fragment.appendChild(drawer.lobby.repoCard(repo, i == 0))
    })

    CAROUSEL_INNER = $("#reposCarousel .carousel-inner")
    CAROUSEL_INNER.append(fragment)
    window.loadToolTips()

    carousel()
})

const carousel = () => {
    const animate = () => {
        CAROUSEL_INNER.animate(
            {scrollLeft:scrollPosition},
            500
        )
    }

    const updateDim = () => {
        carouselWidth = CAROUSEL_INNER[0].scrollWidth
        cardWidth = $(".carousel-item").outerWidth(true)
        const visibleItems = Math.floor(CAROUSEL_INNER.width() / cardWidth)
        step = visibleItems * cardWidth
    }
    updateDim()

    window.addEventListener("resize", () => {
        updateDim()
        if (scrollPosition > carouselWidth - CAROUSEL_INNER.width()) {
            scrollPosition = carouselWidth - CAROUSEL_INNER.width()
            CAROUSEL_INNER.scrollLeft(scrollPosition)
        }
    })

    $(".carousel-control-next").on("click", () => {
        if (scrollPosition < carouselWidth - CAROUSEL_INNER.width()) {
            scrollPosition += step
            if (scrollPosition > carouselWidth - CAROUSEL_INNER.width()) {
                scrollPosition = carouselWidth - CAROUSEL_INNER.width()
            }
            animate()
        }
    })
    $(".carousel-control-prev").on("click", () => {
        if (scrollPosition > 0) {
            scrollPosition -= step
            if (scrollPosition < 0) {
                scrollPosition = 0
            }
            animate()
        }
    })
}

const getPublicRepos = async username => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    return await response.json()
}
