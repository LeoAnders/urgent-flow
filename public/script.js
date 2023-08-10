//print
function printBtn() {
  window.print();
}

//Undo filter  
document.getElementById('undoFilter').addEventListener('click', () => {
  window.location.href = '/'; // Redirect for initial page
});

//Reload page  
function reload(){
  window.location.reload()
};