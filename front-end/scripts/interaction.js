//tab information
function changeContent(content) {
  const information= document.querySelector(".tab-information");
  
  switch (content) {
    case 'Geral':
      information.textContent = "'Geral'. Pedidos independentemente de sua urgência ou status. ";
      break;
    case 'Urgente':
      information.textContent = " 'Urgente', Pedidos que exigem atenção imediata. ";
      break;
    case 'Finalizado':
      information.textContent = "'Finalizado'. Pedidos que foram finalizados.";
      break;
    default:
      break;
  }
}

//navbar
document.addEventListener('DOMContentLoaded', function() {

  const geralLink = document.querySelector('.navbar-nav .nav-link[href="#"]');
  geralLink.classList.add('active');

  const links = document.querySelectorAll('.navbar-nav .nav-link');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      links.forEach(link => link.classList.remove('active'));

      this.classList.add('active');
    });
  });
});