"use strict"

let carouselWidth = 0
let cardWidth = 0
let scrollPosition = 0
let step = 0

window.addEventListener("DOMContentLoaded", () => {
    const CAROUSEL_INNER = $(".carousel-inner")

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
})
