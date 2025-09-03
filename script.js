document.addEventListener("DOMContentLoaded", () => {
  // Card options - use your own images
  const cardArray = [
    { name: "fries", img: "images/fries.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "ice-cream", img: "images/ice-cream.png" },
    { name: "pizza", img: "images/pizza.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "hotdog", img: "images/hotdog.png" },
    { name: "fries", img: "images/fries.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "ice-cream", img: "images/ice-cream.png" },
    { name: "pizza", img: "images/pizza.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "hotdog", img: "images/hotdog.png" },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // Create the board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardBack = document.createElement("img");
      cardBack.setAttribute("src", "images/blank.png");
      cardBack.setAttribute("data-id", i);
      cardBack.classList.add("back");

      const cardFront = document.createElement("img");
      cardFront.setAttribute("src", cardArray[i].img);
      cardFront.classList.add("front");

      card.appendChild(cardBack);
      card.appendChild(cardFront);

      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }
  

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      alert("You have clicked the same image!");
      cards[optionTwoId].classList.remove("flipped");
    } else if (cardArray[optionOneId].name === cardArray[optionTwoId].name) {
      alert("You found a match!");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cards[optionOneId].classList.add("matched");
      cards[optionTwoId].classList.add("matched");
      cardsWon.push(cardsChosen);
    } else {
      // Flip cards back over if they don't match
      setTimeout(() => {
        cards[optionOneId].classList.remove("flipped");
        cards[optionTwoId].classList.remove("flipped");
      }, 500);
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent =
        resultDisplay.textContent + "  Congratulations! You found them all!";
    }
  }
    function resetBoard() {
    // Select all card elements on the board
    const cards = document.querySelectorAll(".card");
    
    // Iterate through each card
    cards.forEach(card => {
        // Remove flipped and matched states
        card.classList.remove("flipped");
        card.classList.remove("matched");
        
        // Remove the old event listener and add a new one
        // This is important because the matched cards had their listeners removed
        card.removeEventListener("click", flipCard);
        card.addEventListener("click", flipCard);
    });

    // Reset all game state variables
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    resultDisplay.textContent = 0;
  }
  // Flip card
  function flipCard() {
    const cardId = this.querySelector(".back").getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.classList.add("flipped");
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  createBoard();
  let butt = document.querySelector(".button1");
  butt.addEventListener("click", () => {
    resetBoard();
  });
  
});
