/* Abre e fecha o menu quando clica nos ícones */
const nav = document.querySelector('#header nav') // O nomezinho colocado entre parênteses é o mesmo que eu colocaria se quisesse alterar o css dele. Exemplo: #header nav{ color: blue;}  Então, basicamente, esse comando pega um pedaço da página
const toggle = document.querySelectorAll('nav .toggle') // agora estou pegando todos

for (const element of toggle) {
  //console.log(element)    Isso mostra ambos os toggles, toggle 1 e toggle 2 (um em cada iteração). OBS: esse element é um nome que nós escolhemos
  element.addEventListener('click', function () {
    nav.classList.toggle('show') //ta fazendo um toggle com a classe show na nav (se tiver, tira, senao coloca)
  }) // Adiciona um evento que fica ouvindo, tipo esperando o gatilho. O primeiro parãmetro é o tipo, que é click, e o segundo é uma função anônima
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show') // No caso removemos porque se os links estão disponíveis, necessariamente o menu está aberto
  })
}

/* Adicionar um sombreado no header da página quando der scrol */

function changeHeaderWhenScroll() {
  const header = document.querySelector('#header')
  const navHeight = header.offsetHeight // pegando o deslocamento da altura

  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // scroll é menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* testimonial carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  /* tem como adicionar breakpoints */
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top' /* De onde o elemento desliza */,
  distance:
    '30px' /* Acho que é a distância que eu devo estar do elemento para ele aparecer */,
  duration: 700 /* Tempo que demora para aparecer */,
  reset: true /* Para o recurso continuar funcionando mesmo após que ela tenha sido completamente mostrado uma vez */
})

scrollReveal.reveal(
  `#home .text, #home .image,
  #about.text, #about .image, 
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links,
  footer .brand, footer .social`,
  {
    interval: 100 /* Intervalo entre um item e outro para aparecer*/
  }
)
//Intervalo de 100ms para que o próximo apareça

/* Botão voltar para o topo */

function backToTop() {
  const backToTopButton = document.querySelector('.back-to-top')

  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* Menu ativo quando estiver em uma aba específica (quando der scroll) */

const sections = document.querySelectorAll('main section[id]')
/* Pegar seções que contenham id. Deixamos fora porque senão ficaria buscando os elementos toda hora */
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4
  /* Pega o deslocamento y mais o tamanho da janela */

  for (const section of sections) {
    const sectionTop = section.offsetTop /* Deslocamento do topo */
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
      /* Pegando o link que tem o href com o id tal */
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

// Usamos window porque é na tela toda
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
