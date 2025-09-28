"use strict"

window.addEventListener('DOMContentLoaded', () => {
    emojisInLoop()
})

const getRandomEmojis = () => {
    const emojis = ["♥️", "🍜", "🖥️", "🧠", "🤖", "🐈", "🐶", "👾", "🐳", "🐘", "🐍", "🐧", "🎁", "🎧", "⛏️", "🗿", "🌽"]

    let coinFlip = 1
    while (Math.random() < 0.5 && coinFlip < emojis.length) coinFlip += 1

    const outEmojis = []
    for (let i = 0; i < coinFlip; i++) {
        const index = Math.floor(Math.random() * emojis.length)
        outEmojis.push(emojis[index])
        emojis.splice(index, 1)
    }

    return outEmojis
}

const writeEmojis = (emojis, node) => {
    emojis.forEach((emoji, index) => {
        const delay = 500 + Math.random() * 500
        setTimeout(() => {
            node.appendChild(document.createTextNode(emoji))
        }, index * 500 + delay)
    })
}

const eraseEmojis = node => {
    const delay = 100 + Math.random() * 150
    Array.from(node.childNodes).reverse().forEach((child, i) => {
        setTimeout(() => {
            child.remove()
        }, i * delay)
    })
}

const emojisInLoop = () => {
    const footerEmoji = document.getElementById('footer-emoji')
    
    const emojis = getRandomEmojis()
    writeEmojis(emojis, footerEmoji)
    setTimeout(() => {
        eraseEmojis(footerEmoji)
        setTimeout(() => {
            emojisInLoop()
        }, Math.random() * 500)
    }, (emojis.length * 500 + 1000) + 2000 / emojis.length)
}
