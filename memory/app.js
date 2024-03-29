document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'photo1',
            img: 'images/photo1.jpg'
        },
        {
            name: 'photo1',
            img: 'images/photo1.jpg'
        },
        {
            name: 'photo2',
            img: 'images/photo2.jpg'
        },
        {
            name: 'photo2',
            img: 'images/photo2.jpg'
        },
        {
            name: 'photo3',
            img: 'images/photo3.jpg'
        },
        {
            name: 'photo3',
            img: 'images/photo3.jpg'
        },
        {
            name: 'photo4',
            img: 'images/photo4.jpg'
        },
        {
            name: 'photo4',
            img: 'images/photo4.jpg'
        },
        {
            name: 'photo5',
            img: 'images/photo5.jpg'
        },
        {
            name: 'photo5',
            img: 'images/photo5.jpg'
        },
        {
            name: 'photo6',
            img: 'images/photo6.jpg'
        },
        {
            name: 'photo6',
            img: 'images/photo6.jpg'
        },
    ]

    cardArray.sort(() => 0.5 - Math.random())
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //create game board 
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/cardTop.jpg');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            document.getElementById('messageDisplay').textContent = 'You got a match!'
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/cardTop.jpg');
            cards[optionTwoId].setAttribute('src', 'images/cardTop.jpg');
            document.getElementById('messageDisplay').textContent = "Sorry, try again."
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Contrats, you found all the matches!';
        }
    }

    //flip card
    function flipCard() {
        var cardId = this.getAttribute('data-id');
      //console.log('Card flipped. Id: ', cardId)
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
       
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 750)
        }
    }

    createBoard()

    //event listener to reset game
    document.getElementById('resetBtn').addEventListener('click', resetGame)

    //reset game
    function resetGame() {
        document.getElementById('messageDisplay').textContent = '';
        resultDisplay.textContent = 0;
        cardsWon = [];
        var cards = document.querySelectorAll('.grid img');
        cards.forEach(card => {
            card.setAttribute('src', 'images/cardTop.jpg');
        })
        cardArray.sort(() => 0.5 - Math.random());
        grid.innerHTML = '';
        createBoard();
    }

});