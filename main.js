function findGetParameter(parameterName) {
  let result = null
  let tmp = []
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
    })
  return result
}

const cardholder = document.getElementById('cardholder')
const scroll_btn = document.getElementById('scroll_btn')
let cards_amount = findGetParameter('n')
let current_card = 0

const InsertCard = (card_obj) => {
  const card = document.createElement('div');
  card.classList.add('card')
  const img_el = document.createElement('img')
  Object.assign(img_el, { src: card_obj.url })
  card.appendChild(img_el)
  const text = document.createElement('p')
  text.innerHTML = card_obj.title
  card.appendChild(text)

  cardholder.appendChild(card)
}

function getCards() {
  fetch('https://jsonplaceholder.typicode.com/photos?_start=' + current_card + '&_limit=' + cards_amount)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(card => {
        InsertCard(card)
      })
      current_card += Number(cards_amount)
    })
}

getCards()

let ticking = false

cardholder.onscroll = function () {
  let pos = cardholder.scrollWidth - cardholder.clientWidth - cardholder.scrollLeft

  if (!ticking) {
    window.requestAnimationFrame(function () {
      if (pos <= cardholder.clientWidth)
        getCards()
      ticking = false
    })

    ticking = true
  }
}

scroll_btn.onclick = function () {
  cardholder.scrollLeft += cardholder.clientWidth
}