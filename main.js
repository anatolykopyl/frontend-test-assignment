function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

const InsertCard = (card_obj) => {
  const card = document.createElement('div');
  card.classList.add('card')
  img_el = document.createElement('img')
  Object.assign(img_el, { src: card_obj.url });
  card.appendChild(img_el)
  text = document.createElement('p')
  text.innerHTML = card_obj.title;
  card.appendChild(text)

  document.getElementById('cardholder').appendChild(card)
};

let cards_amount = findGetParameter('n')
let current_card = 0

function getCards() {
  fetch('https://jsonplaceholder.typicode.com/photos?_start=' + current_card + '&_limit=' + cards_amount)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(card => {
        console.log(card)
        InsertCard(card)
      })
      current_card += Number(cards_amount)
    })
}

getCards()

let lastKnownScrollPosition = 0;

function updCards(scrollPos) {
  if (scrollPos === 0) {
    getCards()
  }
}

let cardholder = document.getElementById('cardholder')
cardholder.onscroll = function (e) {
  lastKnownScrollPosition = cardholder.scrollWidth - cardholder.clientWidth - cardholder.scrollLeft;
  updCards(lastKnownScrollPosition);
}