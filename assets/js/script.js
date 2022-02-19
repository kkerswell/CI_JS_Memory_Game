// Original Code - Will get the height of the modal and set the height of the overlay to match
$(window).on('shown.bs.modal', function(){
    let modalHeight = document.getElementById("game-display").offsetHeight;
    let ngOverlay = document.getElementById("new-game-text");
    let goOverlay = document.getElementById("game-over-text");
    let loOverlay = document.getElementById("level-one-victory-text");
    let ltOverlay = document.getElementById("level-two-victory-text");
    let vOverlay = document.getElementById("victory-text");
    
    ngOverlay.setAttribute("style", "height: " + modalHeight + "px;");
    goOverlay.setAttribute("style", "height: " + modalHeight + "px;");
    loOverlay.setAttribute("style", "height: " + modalHeight + "px;");
    ltOverlay.setAttribute("style", "height: " + modalHeight + "px;");
    vOverlay.setAttribute("style", "height: " + modalHeight + "px;");
});

