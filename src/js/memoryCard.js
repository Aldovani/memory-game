import {start,clearTimer} from "./timer.js"

const cardArray = [
  {
    name: "Boneco",
    img: "assets/images/Image1.png",
  },
  {
    name: "Boneco",
    img: "assets/images/Image1.png",
  },
  {
    name: "Olho",
    img: "assets/images/Image2.png",
  },
  {
    name: "Olho",
    img: "assets/images/Image2.png",
  },
  {
    name: "Abobora",
    img: "assets/images/Image3.png",
  },
  {
    name: "Abobora",
    img: "assets/images/Image3.png",
  },
  {
    name: "Espantalho",
    img: "assets/images/Image4.png",
  },
  {
    name: "Espantalho",
    img: "assets/images/Image4.png",
  },
  {
    name: "Bruxa",
    img: "assets/images/Image5.png",
  },
  {
    name: "Bruxa",
    img: "assets/images/Image5.png",
  },
  {
    name: "Livro",
    img: "assets/images/Image6.png",
  },
  {
    name: "Livro",
    img: "assets/images/Image6.png",
  },
  {
    name: "Caixão",
    img: "assets/images/Image7.png",
  },
  {
    name: "Caixão",
    img: "assets/images/Image7.png",
  },
  {
    name: "Zumbi",
    img: "assets/images/Image8.png",
  },
  {
    name: "Zumbi",
    img: "assets/images/Image8.png",
  },
  {
    name: "Chapéu de bruxa",
    img: "assets/images/Image9.png",
  },
  {
    name: "Chapéu de bruxa",
    img: "assets/images/Image9.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());
const cardsChosen = [],
  cardsChosenId = [],
  cardsWoh = [];
let isPlaying = false;
let tentativas = 0;
const containerCard = document.querySelector(".container-card");

export function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const Card = `
  <div class="flip-card" data-id=${i}>
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <span>?</span>
          </div>
          <div class="flip-card-back">
            <img src="${cardArray[i].img}" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
    containerCard.innerHTML += Card;
  }
  addCardEventListener();
}

function checkForMatch() {
  const cardOneId = cardsChosenId[0];
  const cardTwoId = cardsChosenId[1];
  const elementOne = document.querySelector(`[data-id='${cardOneId}']`);
  const elementTwo = document.querySelector(`[data-id='${cardTwoId}']`);
 
  
  if (cardsChosen[0] === cardsChosen[1]) {
    elementOne.classList.add("match");
    elementTwo.classList.add("match");
    
    cardsWoh.push(cardsChosen);
  } else {
    elementOne.classList.remove("show");
    elementTwo.classList.remove("show");
  }
  cardsChosen.length = 0;
  cardsChosenId.length = 0;
  addCardEventListener();
  removeCardEventListener();
  checkWin();
}

function flipCard() {
  if (!isPlaying) {
    isPlaying = true;
    start();
  }


  const cardId = this.getAttribute("data-id");
  console.log(cardsChosenId.includes(cardId))
  if (cardsChosenId.includes(cardId)) return;
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.classList.add("show");

  if (cardsChosen.length === 2) {
    tentativas++;
    document.querySelector(".jogadas").textContent =`Jogadas: ${tentativas}`;
    document
      .querySelectorAll(".flip-card")
      .forEach((card) => card.removeEventListener("click", flipCard));
    setTimeout(checkForMatch, 500);
  }
}

function addCardEventListener() {
  const cards = document.querySelectorAll(".flip-card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

function removeCardEventListener() {
  const cards = document.querySelectorAll(".flip-card.match");
  cards.forEach((card) => card.removeEventListener("click", flipCard));
}

function checkWin() {
  if (cardsWoh.length === cardArray.length / 2) {
    clearTimer();
    isPlaying = false;
   document.querySelector(".modal").classList.add("show");
  }
}

const buttonPlay = document.querySelector(".button-play");
buttonPlay.addEventListener("click", () => { 
  containerCard.innerHTML = "";
  document.querySelector(".modal").classList.remove("show");
  cardsWoh.length = 0;
  tentativas = 0;

  createBoard()
})
