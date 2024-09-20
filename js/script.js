document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    var elemsCarousel = document.querySelectorAll('.carousel');
    var instancesCarousel = M.Carousel.init(elemsCarousel, {
        fullWidth: true,
        indicators: true,
        duration: 1000 // Tempo de rotação das imagens
    });

    setInterval(function() {
        var elem = document.querySelector('.carousel');
        var instance = M.Carousel.getInstance(elem);
        instance.next();
    }, 4000); // 4 segundos
});
// Seleciona as imagens do sistema e o modal
const images = document.querySelectorAll('#imagens-sistema .card-image img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const close = document.getElementById('close');

// Função para abrir o modal
images.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = image.src;

        // Adiciona a classe para desfoque
        document.body.classList.add('modal-open');
    });
});

// Função para fechar o modal
close.addEventListener('click', () => {
    modal.style.display = "none";

    // Remove a classe de desfoque
    document.body.classList.remove('modal-open');
});

// Fecha o modal ao clicar fora da imagem
modal.addEventListener('click', (event) => {
    if (event.target !== modalImg) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }
});
