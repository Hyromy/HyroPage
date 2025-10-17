"use strict"

import { Drawer } from "/static/js/classes/Drawer.js"
const drawer = new Drawer()

let CAROUSEL_INNER = null

let carouselWidth = 0
let cardWidth = 0
let scrollPosition = 0
let step = 0

const getReposData = async () => {
    const username = "Hyromy"
    try {
        const response = await fetch(
            window.location.origin + "/this/get-repos/" + username,
            {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }
        )

        if (!response.ok) {
            throw new Error(`network response was not ok: ${response.statusText} (${response.status})`)
        }

        return await response.json()
    
    } catch (err) {
        console.warn(err)
    }
    
    return []
}

const prepareCarousel = repoData => {
    const carouselID = "reposCarousel"

    const SECTION = document.getElementById("reposArt")
    SECTION.append(drawer.carousel(carouselID))
    
    CAROUSEL_INNER = $(`#${carouselID} .carousel-inner`)

    const fragment = document.createDocumentFragment()
    repoData.forEach((repo, i) => {
        fragment.appendChild(drawer.lobby.repoCard(repo, i == 0))
    })

    CAROUSEL_INNER.append(fragment)
    window.loadToolTips()
}

const setCarouselMotion = () => {
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

(async () => {
    const data = await getReposData()
    if (data.length != 0) {
        const main = () => {
            prepareCarousel(data)
            setCarouselMotion()
        }

        if (document.readyState == "loading") {
            window.addEventListener("DOMContentLoaded", main)
        } else {
            main()
        }
    }
})()
