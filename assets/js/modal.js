function openModal() {
  var body = document.getElementsByTagName("body")[0];
  var gameButton = document.getElementById("game-modal-button");
  var modal = document.getElementById("game-modal");
  var modalConfirmExit = document.getElementById("confirmExitModal");
  var exit = document.getElementsByClassName("exit")[0];
  var confirmClose = document.getElementsByClassName("confirmClose")[0];
  var declineClose = document.getElementsByClassName("declineClose")[0];

  /**
   * When the user clicks on the game-modal-button, open the modal
   */
  gameButton.onclick = function() {
    body.style.overflow = "hidden";
    body.style.height = "100vh";
    modal.style.display = "block";
  }

  /**
   * When the user clicks on exit, opens modalConfirmExit.
   * Defensive programming against accidental button click
   */
  exit.onclick = function() {
    modalConfirmExit.style.display = "block";
  }

  /**
   * When the user clicks on yes, closes all modals
   */
  confirmClose.onclick = function() {
      modalConfirmExit.style.display = "none";
      modal.style.display = "none";
      body.style.removeProperty("overflow");
      body.style.removeProperty("height");
  }

  /**
   * When the user clicks on no, closes confirmExitModal only
   */
  declineClose.onclick = function() {
      modalConfirmExit.style.display = "none";
  }
}

/**
 * Checks ready state for DOMContentLoaded.
 * Once status is DOMContentLoaded, openModal function is run.
 */
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', openModal);
} else {
  openModal();
}