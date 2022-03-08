class AudioController {
    constructor() {
        this.bgMusic = new Audio('assets/audio/gamemusic.mp3');
        this.flipSound = new Audio('assets/audio/flip.mp3');
        this.matchSound = new Audio('assets/audio/match.mp3');
        this.victorySound = new Audio('assets/audio/victory.wav');
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
}

class MixOrMatch {
    constructor(cards) {
        let totalTime = null;
        let level = null;
        this.cardsArray = cards;
        this.currentlevel = level;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    levelOne() {
        this.level = 1;
        this.totalTime = 100;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.audioController.bgMusic.muted = true;
            this.audioController.victorySound.muted = true;
            this.audioController.gameOverSound.muted = true;
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    // Original Code Start - Created to allow the user to progress through levels
    levelTwo() {
        this.level = 2;
        this.totalTime = 60;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    levelThree() {
        this.level = 3;
        this.totalTime = 35;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    } // Original Code End
    startCountdown() {
        var isPaused = false;
        return setInterval(() => {
            if (isPaused == false) {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
                if(this.timeRemaining === 0)
                    this.gameOver();
            } else {
                this.timeRemaining = this.timer.innerText;
                clearInterval(this.countdown);
            };
        }, 1000);
    }
    // Original Code Start - Created to allow the user to progress through levels
    victoryLevelOne() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('level-one-victory-text').classList.add('visible');           
    }
    victoryLevelTwo() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('level-two-victory-text').classList.add('visible');
    } // Original Code End
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
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
        if(this.matchedCards.length === this.cardsArray.length && this.level === 1)
            this.victoryLevelOne();
        if(this.matchedCards.length === this.cardsArray.length && this.level === 2)
            this.victoryLevelTwo();
        if(this.matchedCards.length === this.cardsArray.length && this.level === 3)
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
    shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm
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

/**
 * @param {*} currentGame
 * Will allow the user to mute and unmute game music
 */
 function volMuteUnmute(currentGame) {
    let volSwitch = document.getElementById('volSwitch');

    volSwitch.addEventListener('change', function() {
        if (!this.checked) {
            currentGame.audioController.bgMusic.muted = true;
            currentGame.audioController.victorySound.muted = true;
            currentGame.audioController.gameOverSound.muted = true;
        } else if (this.checked) {
            currentGame.audioController.bgMusic.muted = false;
            currentGame.audioController.victorySound.muted = false;
            currentGame.audioController.gameOverSound.muted = false;
        }
    });
}

/**
 * @param {*} currentGame 
 * Will allow the user to mute and unmute game sound effects
 */
function fxMuteUnmute(currentGame) {
    let fxSwitchInitialState = document.getElementById('fxSwitch').checked;
    let fxSwitch = document.getElementById('fxSwitch');

    if (fxSwitchInitialState === false) {
        currentGame.audioController.flipSound.muted = true;
        currentGame.audioController.matchSound.muted = true;        
    } else if (fxSwitchInitialState === true) {
        currentGame.audioController.flipSound.muted = false;
        currentGame.audioController.matchSound.muted = false;
    }

    fxSwitch.addEventListener('change', function() {
        if (!fxSwitch.checked) {
            currentGame.audioController.flipSound.muted = true;
            currentGame.audioController.matchSound.muted = true;
        } else if (fxSwitch.checked) {
            currentGame.audioController.flipSound.muted = false;
            currentGame.audioController.matchSound.muted = false;
        }
    });
}

/**
 * @class {*} MixOrMatch
 * Creates new MixOrMatch
 * Allow the user to progress through levels
 */
function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    var confirmClose = document.getElementsByClassName("confirmClose")[0];
    let game = new MixOrMatch(cards);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);          
        });
    });

    confirmClose.addEventListener('click', () => {
        window.location.reload();
        location.href='index.html#game';
    });

    let newGameOverlay = document.getElementById('new-game-text');
    let victoryLevelOneOverlay = document.getElementById('level-one-victory-text');
    let victoryLevelTwoOverlay = document.getElementById('level-two-victory-text');
    let victoryGameOverlay = document.getElementById('victory-text');
    let gameOverOverlay = document.getElementById('game-over-text');

    newGameOverlay.addEventListener('click', () => {
        newGameOverlay.classList.remove('visible');
        game.levelOne();
        volMuteUnmute(game);
        fxMuteUnmute(game);
    });
    victoryGameOverlay.addEventListener('click', () => {
        victoryGameOverlay.classList.remove('visible');
        game.levelOne();
        volMuteUnmute(game);
        fxMuteUnmute(game);
    });
    gameOverOverlay.addEventListener('click', () => {
        gameOverOverlay.classList.remove('visible');
        game.levelOne();
        volMuteUnmute(game);
        fxMuteUnmute(game);
    });
    victoryLevelOneOverlay.addEventListener('click', () => {
        victoryLevelOneOverlay.classList.remove('visible');
        game.levelTwo();
        volMuteUnmute(game);
        fxMuteUnmute(game);
    });
    victoryLevelTwoOverlay.addEventListener('click', () => {
        victoryLevelTwoOverlay.classList.remove('visible');
        game.levelThree();
        volMuteUnmute(game);
        fxMuteUnmute(game);
    });
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}