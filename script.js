document.addEventListener("DOMContentLoaded", function () {
  console.log("Sistema Acadêmico IBMEC Clone - Aluno: Cesar");

  const carouselContainer = document.querySelector(".disciplines__carousel");
  const cards = document.querySelectorAll(".disciplines__carousel .card");
  const paginationContainer = document.getElementById("dynamic-pagination");
  const nextBtn = document.getElementById("next-btn");
  const gap = 16; // Gap entre os cards configurado no CSS

  // Array para armazenar as bolinhas que vamos criar
  let dots = [];

  // 1. Gerar as bolinhas dinamicamente baseado na quantidade de cards
  cards.forEach((card, index) => {
    // Cria o elemento da bolinha
    const dot = document.createElement("span");
    dot.classList.add("dot");

    // A primeira bolinha já começa ativa
    if (index === 0) {
      dot.classList.add("active");
    }

    // Insere a bolinha antes da seta para a direita (nextBtn)
    paginationContainer.insertBefore(dot, nextBtn);
    dots.push(dot); // Guarda no array para usarmos depois

    // 2. Adicionar o evento de clique em cada bolinha criada
    dot.addEventListener("click", function () {
      const cardWidth = cards[index].offsetWidth;
      carouselContainer.scrollTo({
        left: (cardWidth + gap) * index,
        behavior: "smooth",
      });
    });
  });

  // Função para atualizar qual bolinha está com a classe 'active'
  function updatePagination(activeIndex) {
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // 3. Detectar o scroll manual (arrastar no celular) e atualizar as bolinhas
  carouselContainer.addEventListener("scroll", function () {
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const totalCardWidth = cardWidth + gap;
    const scrollLeft = carouselContainer.scrollLeft;

    // Calcula qual card está mais centralizado/visível
    const activeIndex = Math.round(scrollLeft / totalCardWidth);

    // Garante que o índice não saia dos limites (0 até o total de cards - 1)
    const finalIndex = Math.max(0, Math.min(activeIndex, cards.length - 1));

    updatePagination(finalIndex);
  });
});

// --- LÓGICA DO MURAL DE AVISOS (CARROSSEL AUTOMÁTICO COM ROLAGEM) ---
const bannerTrack = document.getElementById("banner-track");
const bannerSlides = document.querySelectorAll(".banner__slide");
const bannerDots = document.querySelectorAll(".banner-pagination .dot");
let currentBannerIndex = 0;
const bannerIntervalTime = 4000; // Troca a cada 4 segundos

function showBannerSlide(index) {
  // Empurra a trilha de slides para a esquerda baseado no índice
  bannerTrack.style.transform = `translateX(-${index * 100}%)`;

  // Atualiza a bolinha visualmente ativa
  bannerDots.forEach((dot) => dot.classList.remove("active"));
  bannerDots[index].classList.add("active");
}

function nextBannerSlide() {
  currentBannerIndex++;
  if (currentBannerIndex >= bannerSlides.length) {
    currentBannerIndex = 0; // Volta para o primeiro slide
  }
  showBannerSlide(currentBannerIndex);
}

// Inicia o temporizador do carrossel automático
let bannerTimer = setInterval(nextBannerSlide, bannerIntervalTime);

// BÔNUS: Permite clicar nas bolinhas do mural para trocar manualmente
bannerDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    clearInterval(bannerTimer); // Pausa o tempo automático ao clicar
    currentBannerIndex = index;
    showBannerSlide(currentBannerIndex);
    bannerTimer = setInterval(nextBannerSlide, bannerIntervalTime); // Reinicia o temporizador
  });
});
