// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("exit-game")[0];

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

window.onload = function handleModal() {
    document.getElementById("game-modal-button").click(function() {
        let modal = document.getElementById("game-modal");
        modal.style.display = "block";
    });
};