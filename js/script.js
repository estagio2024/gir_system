
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

// Lightbox logic
const images = document.querySelectorAll('#imagens-sistema .card-image img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src; // Define a imagem do lightbox
        lightbox.style.display = 'flex'; // Mostra o lightbox
    });
});

// Carrossel customizado
let currentTranslateX = 0;
const items = document.querySelectorAll('.wrap .item');
const wrap = document.querySelector('.wrap');
const itemWidth = items[0].offsetWidth + 20; // Pega a largura de cada item e a margem
const totalItems = items.length;
const maxMove = -(itemWidth * (totalItems - Math.floor(wrap.offsetWidth / itemWidth))); // Calcula o limite de movimento

function moveLeft() {
    if (currentTranslateX < 0) {
        currentTranslateX += itemWidth;
        wrap.style.transform = `translateX(${currentTranslateX}px)`;
    }
}
function moveRight() {
    const button = document.querySelector('.arrow.right');
    button.classList.add('disabled'); // Adiciona a classe disabled ao botão

    // Move o carrossel
    if (currentTranslateX > maxMove) {
        currentTranslateX -= itemWidth;
        wrap.style.transform = `translateX(${currentTranslateX}px)`;
    }

    // Remove a classe disabled após 1 segundo (ou outro tempo que você desejar)
    setTimeout(() => {
        button.classList.remove('disabled');
    }, 1000); // 1 segundo
}

// Adiciona um listener para remover a classe ao clicar fora
document.addEventListener('click', function(event) {
    const button = document.querySelector('.arrow.right');
    if (!button.contains(event.target)) {
        button.classList.remove('disabled');
    }
});
