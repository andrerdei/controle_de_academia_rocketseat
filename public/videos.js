// Declarando Variáveis Globais

const allCards = document.querySelectorAll(".card")


// Chamadas

for (let card of allCards){
    card.addEventListener("click", () => {
        const videoId = card.getAttribute("id")
        window.location.href = `/videos?id=${videoId}`
    })
}