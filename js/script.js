
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
    if (currentTranslateX > maxMove) {
        currentTranslateX -= itemWidth;
        wrap.style.transform = `translateX(${currentTranslateX}px)`;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar o tamanho da tela
    function checkWindowSize() {
        var divTeste = document.getElementById('teste');

        if (window.innerWidth <= 768) { // Largura típica de dispositivos móveis
            divTeste.classList.add('center'); // Adiciona a classe 'center'
        } else {
            divTeste.classList.remove('center'); // Remove a classe 'center' em telas maiores
        }
    }

    // Verifica o tamanho da tela ao carregar a página
    checkWindowSize();

    // Verifica novamente quando a janela é redimensionada
    window.addEventListener('resize', checkWindowSize);
});

if (document.addEventListener) {
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        return false;
    });
} else { //Versões antigas do IE
    document.attachEvent("oncontextmenu", function(e) {
        e = e || window.event;
        e.returnValue = false;
        return false;
    });
}
if (document.addEventListener) {
    document.addEventListener("keydown", bloquearSource);
} else { //Versões antigas do IE
    document.attachEvent("onkeydown", bloquearSource);
}

function bloquearSource(e) {
    e = e || window.event;

    var code = e.which || e.keyCode;

    if (
        e.ctrlKey &&
        (code == 83 || code == 85) //83 = S, 85 = U
    ) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        return false;
    }
}

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}