class AudioController {
    constructor() {
        // Sound source: https://soundimage.org/puzzle-music/#mep_12
        this.bgMusic = new Audio('assets/audio/gamemusic.mp3');
        // Sound source: https://mixkit.co/free-sound-effects/casino/
        this.flipSound = new Audio('assets/audio/flip.mp3');
        // Sound source: https://mixkit.co/free-sound-effects/game-show/
        this.matchSound = new Audio('assets/audio/match.mp3');
        // Sound source: https://mixkit.co/free-sound-effects/win/
        this.victorySound = new Audio('assets/audio/victory.wav');
        // Sound source: https://mixkit.co/free-sound-effects/game-over/
        this.gameOverSound = new Audio('assets/audio/gameover.wav');
        this.bgMusic.volume = 0.4;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }

    // Orignal Code - turns sounds on and off
    // Sounds off
    volumeOff() {
        this.bgMusic.volume = 0;
        this.victorySound.volume = 0;
        this.gameOverSound.volume = 0;
    }
    fxOff() {
        this.flipSound.volume = 0;
        this.matchSound.volume = 0;
    }
    // Sounds on
    volumeOn() {
        this.bgMusic.volume = 0.4;
        this.victorySound.volume = 1;
        this.gameOverSound.volume = 1;
    }
    fxOn() {
        this.flipSound.volume = 1;
        this.matchSound.volume = 1;
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

$(document).ready(function () {
     $('#volSwitch').change(function () {
         if (!this.checked)
             volDisabled(this);
         else if (this.checked)
             volEnabled(this);
     });
 });

 $(document).ready(function () {
     $('#fxSwitch').change(function () {
         if (!this.checked)
             fxDisabled(this);
         else if (this.checked)
             fxEnabled(this);
     });
 });

 function volDisabled(ele) {
     let volDisabledController = new AudioController();

     volDisabledController.volumeOff();
     console.log(' ID: ' + ele.id + ' just got unchecked! ');
 }

 function volEnabled(ele) {
     let volEnabledController = new AudioController();

     volEnabledController.volumeOn();
     console.log(' ID: ' + ele.id + ' just got checked! ');
 }

function fxDisabled(ele) {
    let fxDisabledController = new AudioController();

    fxDisabledController.fxOff();
    console.log(' ID: ' + ele.id + ' just got unchecked! ');
}

function fxEnabled(ele) {
    let fxEnabledController = new AudioController();

    fxEnabledController.fxOn();
    console.log(' ID: ' + ele.id + ' just got checked! ');
}