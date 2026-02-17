// ===== Step 5: Defining variables to access data =====
const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startbtn");
const statusEl = document.getElementById("status");

// Oyun ayarları
const TIME_LIMIT = 30;
const PAIRS = 6; // 6 çift = 12 kart
const COLORS = [
  "#ff3b30", "#ff9500", "#ffcc00",
  "#34c759", "#0a84ff", "#bf5af2"
];

// Oyun state (durumu)
let cards = [];               // kart verileri
let firstCard = null;         // ilk seçilen DOM kartı
let secondCard = null;        // ikinci seçilen DOM kartı
let lockBoard = false;        // eşleşme kontrolü sırasında tıklamayı kilitle
let score = 0;
let matchedPairs = 0;
let timeLeft = TIME_LIMIT;
let timerId = null;
let gameActive = false;

// ===== yardımcı: shuffle (Fisher-Yates) =====
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== Step 6: Create and call functions to start the game =====
function buildDeck() {
  // 6 rengi 2'şer kopyalayarak çiftler oluşturuyoruz
  const deck = [];
  for (let i = 0; i < PAIRS; i++) {
    const color = COLORS[i % COLORS.length];
    deck.push({ id: `${i}-a`, pairKey: `pair-${i}`, color });
    deck.push({ id: `${i}-b`, pairKey: `pair-${i}`, color });
  }
  return shuffle(deck);
}

function renderBoard(deck) {
  gameContainer.innerHTML = "";

  deck.forEach((cardData) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.pairKey = cardData.pairKey;

    // Ön ve arka yüzleri oluştur
    const back = document.createElement("div");
    back.className = "card-face card-back";
    back.textContent = "❓";

    const front = document.createElement("div");
    front.className = "card-face card-front";
    front.style.background = cardData.color;

    card.appendChild(back);
    card.appendChild(front);

    // Tıklama
    card.addEventListener("click", () => onCardClick(card));

    gameContainer.appendChild(card);
  });
}

function resetState() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  score = 0;
  matchedPairs = 0;
  timeLeft = TIME_LIMIT;
  gameActive = fa