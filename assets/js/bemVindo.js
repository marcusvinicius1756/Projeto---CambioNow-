document.addEventListener('DOMContentLoaded', function() {
    const mensagemBemVindo = document.querySelector('.box-container p');
    
  
    const nomeSalvo = localStorage.getItem('nomeUsuario') || 'Visitante';
    

    if(mensagemBemVindo) {
        mensagemBemVindo.textContent = `Olá ${nomeSalvo}, seja bem-vindo ao conversor de moedas!`;
    }
});