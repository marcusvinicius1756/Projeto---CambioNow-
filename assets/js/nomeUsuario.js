document.addEventListener('DOMContentLoaded', function() {
    const nomeInput = document.querySelector('.box-container input');
    const prosseguirBtn = document.querySelector('.btn-verde button');

    prosseguirBtn.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        
        if(nome) {
    
            localStorage.setItem('nomeUsuario', nome);
        } else {
         
            localStorage.setItem('nomeUsuario', 'Visitante');
        }
    });
});