//print
function printBtn() {
  window.print();
}

//Undo filter
document.addEventListener("DOMContentLoaded", function () {
  let undoFilterButton = document.getElementById("undoFilter");

  if (undoFilterButton) {
    undoFilterButton.addEventListener("click", function () {
      window.location.href = "/";
    });
  }
});

// after 2s the element of messages close
setTimeout(function () {
  var flashMessage = document.getElementById("flash-message");
  flashMessage.classList.add("fade-out");
  setTimeout(function () {
    flashMessage.remove();
  }, 500);
}, 1500);
