"use strict"

export class Drawer {
    carousel = id => {
        const carousel = document.createElement("div")
        carousel.id = id
        carousel.classList.add("carousel")

        const carouselInner = document.createElement("div")
        carouselInner.classList.add("carousel-inner")
        
        carousel.appendChild(carouselInner)

        for (const i of ["prev", "next"]) {
            const button = document.createElement("button")
            button.classList.add(`carousel-control-${i}`)
            button.type = "button"
            button.setAttribute("data-bs-target", `#${id}`)
            button.setAttribute("data-bs-slide", i)

            const div = document.createElement("div")
            div.classList.add("bg-dark", "bg-opacity-50", "rounded", "p-2")

            const icon = document.createElement("i")
            icon.classList.add("bi", `bi-chevron-${i == "prev" ? "left" : "right"}`, "text-white")

            const span = document.createElement("span")
            span.classList.add("visually-hidden")
            span.textContent = i == "prev" ? "Previous" : "Next"

            div.appendChild(icon)
            button.appendChild(div)
            button.appendChild(span)
            carousel.appendChild(button)
        }

        return carousel
    }
    constructor() {
        this.lobby = {
            repoCard: (repo, isFirst) => {
                const carouselItem = document.createElement("div")
                carouselItem.classList.add("carousel-item")
                if (isFirst) carouselItem.classList.add("active")

                const card = document.createElement("div")
                card.classList.add("card", "text-center", "h-100")

                const cardHeader = document.createElement("div")
                cardHeader.classList.add("card-header", "d-flex", "justify-content-between", "align-items-center", "gap-2")

                const title = document.createElement("h5")
                title.classList.add("card-title", "mb-0", "flex-grow-1", "text-start")
                title.textContent = repo.name

                const AmOwner = repo.owner.login == "Hyromy"
                const isFork = repo.fork
                const badgeData = {
                    icon:
                        isFork ? "bi-diagram-2-fill" :
                        AmOwner ? "bi-person-fill" : "bi-puzzle-fill",
                    color:
                        isFork ? "#6f42c1" :
                        AmOwner ? "#28a745" : "#0366d6",
                    text:
                        isFork ? "Bifurcado" :
                        AmOwner ? "Propietario" : "Colaborador"
                }

                const badge = document.createElement("span")
                badge.setAttribute("data-bs-toggle", "tooltip")
                badge.setAttribute("data-bs-placement", "top")
                badge.setAttribute("data-bs-title", badgeData.text)
                badge.classList.add("badge", "d-flex", "align-items-center", "gap-1", "flex-shrink-0")
                badge.style.backgroundColor = badgeData.color
                badge.innerHTML = `<i class="bi ${badgeData.icon}"></i>`

                cardHeader.appendChild(title)
                cardHeader.appendChild(badge)

                const isPrivate = repo.private
                if (isPrivate) {
                    const privateBadge = document.createElement("span")
                    privateBadge.setAttribute("data-bs-toggle", "tooltip")
                    privateBadge.setAttribute("data-bs-placement", "top")
                    privateBadge.setAttribute("data-bs-title", "Privado")
                    privateBadge.classList.add("badge", "bg-secondary", "d-flex", "align-items-center", "gap-1", "flex-shrink-0")
                    privateBadge.innerHTML = `<i class="bi bi-lock-fill"></i>`
                    cardHeader.appendChild(privateBadge)
                }

                const cardBody = document.createElement("div")
                cardBody.classList.add("card-body", "d-flex", "flex-column")

                const description = document.createElement("p")
                description.classList.add("card-text", "flex-grow-1", "d-flex", "justify-content-center", "align-items-center")
                description.textContent = repo.description || "Sin descripción"

                const owner = repo.owner.login
                const link = document.createElement("a")
                link.classList.add("btn", "btn-primary")
                link.href = !isPrivate ? repo.html_url : "https://github.com/" + owner
                link.target = "_blank"
                link.textContent = !isPrivate ? "Ver en GitHub" : `Ver a ${owner} en GitHub`
                
                const cardFooter = document.createElement("div")
                cardFooter.classList.add("card-footer", "text-body-secondary", "d-flex", "justify-content-center", "flex-wrap", "gap-2")

                for (const lang of Object.keys(repo.langs).sort((a, b) => repo.langs[b] - repo.langs[a]).slice(0, 5)) {
                    const badge = document.createElement("span")
                    badge.classList.add("badge", "lang-badge", "text-bg-secondary", "d-flex", "align-items-center", "gap-1")

                    const lowerLang = lang.toLowerCase()
                    const iconName
                        = lowerLang == "c#" ? "csharp"
                        : lowerLang == "shell" ? "bash"
                        : lowerLang == "dockerfile" ? "docker"
                        : lowerLang == "c++" ? "cpp"
                        : lowerLang

                    const icon = document.createElement("img")
                    icon.src = `/static/icon/${iconName}-plain.svg`
                    icon.width = "16"
                    icon.height = "16"
                    icon.alt = lang
                    icon.style.filter = "brightness(0) invert(1)"

                    badge.appendChild(icon)
                    badge.appendChild(document.createTextNode(lang))
                    cardFooter.appendChild(badge)
                }

                cardBody.appendChild(description)
                cardBody.appendChild(link)
                
                card.appendChild(cardHeader)
                card.appendChild(cardBody)
                card.appendChild(cardFooter)
                
                carouselItem.appendChild(card)

                return carouselItem
            }
        }
    }
}
