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



const images = document.querySelectorAll('#imagens-sistema .card-image img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src; // Define a imagem do lightbox
        lightbox.style.display = 'flex'; // Mostra o lightbox
    });
});

let currentTranslateX = 0;
const itemWidth = 320; // Largura do item (300px) + margem (20px)
const maxMove = -itemWidth * (document.querySelectorAll('.wrap .item').length / 2); // Metade dos itens

function moveLeft() {
    if (currentTranslateX < 0) {
        currentTranslateX += itemWidth;
        document.querySelector('.wrap').style.transform = `translateX(${currentTranslateX}px)`;
    }
}

function moveRight() {
    if (currentTranslateX > maxMove) {
        currentTranslateX -= itemWidth;
        document.querySelector('.wrap').style.transform = `translateX(${currentTranslateX}px)`;
    }
}
