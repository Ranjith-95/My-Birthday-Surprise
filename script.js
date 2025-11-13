// ---------- CONFIG ----------
const recipientName = "Sujithra";
const birthdayAge = 16;

// get references
const screens = {
  start: document.getElementById('screen-start'),
  cake: document.getElementById('screen-cake'),
  balloons: document.getElementById('screen-balloons'),
  photos: document.getElementById('screen-photos'),
  message: document.getElementById('screen-message'),
  final: document.getElementById('screen-final')
};

const bgMusic = document.getElementById('bg-music');
const btnStart = document.getElementById('btn-start');
const btnDecorate = document.getElementById('btn-decorate');
const btnLight = document.getElementById('btn-light');
const btnNextCake = document.getElementById('btn-next-cake');
const balloons = Array.from(document.querySelectorAll('.balloon'));
const wordEls = [
  document.getElementById('word1'),
  document.getElementById('word2'),
  document.getElementById('word3'),
  document.getElementById('word4')
];
const btnNextBalloons = document.getElementById('btn-next-balloons');

const photoCards = Array.from(document.querySelectorAll('.photo-card'));
const btnToMessage = document.getElementById('btn-to-message');
const messageCard = document.getElementById('message-card');
const tapOpen = document.getElementById('tap-open');
const finalMessageText = document.getElementById('final-message-text');
const btnToFinal = document.getElementById('btn-to-final');

const giftReveal = document.getElementById('gift-reveal');
const giftImageContainer = document.getElementById('gift-image-container');
const btnFinally = document.getElementById('btn-finally');
const finalWish = document.getElementById('final-wish-text');

// state
let poppedCount = 0;
let currentIndex = 0; // for photo carousel

// ---------- HELPERS ----------
function showScreen(name) {
  // hide all then show requested
  Object.values(screens).forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('active');
  });
  if (screens[name]) {
    screens[name].classList.remove('hidden');
    screens[name].classList.add('active');
  }
}

// ---------- FIXED AUDIO FUNCTION ----------
function startMusic() {
  if (!bgMusic) return;

  // Ensure file is ready
  bgMusic.load();
  bgMusic.volume = 1;

  // Try playing immediately
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("🎶 Music started successfully");
      })
      .catch((err) => {
        console.warn("Autoplay blocked — waiting for user interaction...", err);

        // If blocked, wait for next user click anywhere
        document.body.addEventListener(
          "click",
          () => {
            bgMusic.play();
          },
          { once: true }
        );
      });
  }
}

// ---------- EVENTS ----------
// START button: starts music and navigates to cake
btnStart.addEventListener('click', () => {
  startMusic();
  showScreen('cake');
});

// Decorate cake
btnDecorate.addEventListener('click', () => {
  const cakeImg = document.getElementById('cake-image');
  cakeImg.src = 'cake_decorated.png';
  btnDecorate.classList.add('hidden');
  btnLight.classList.remove('hidden');
});

// Light the candle
btnLight.addEventListener('click', () => {
  const cakeImg = document.getElementById('cake-image');
  cakeImg.src = 'cake_lit.png';
  btnLight.classList.add('hidden');
  btnNextCake.classList.remove('hidden');
});

// Next after cake
btnNextCake.addEventListener('click', () => showScreen('balloons'));

// BALLOON logic
balloons.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('popped')) return;
    btn.classList.add('popped');
    // show corresponding word
    const w = wordEls[idx];
    if (w) w.classList.add('show');

    poppedCount++;
    if (poppedCount >= 4) {
      setTimeout(() => btnNextBalloons.classList.remove('hidden'), 500);
    }
  });
});

// next from balloons to photos
btnNextBalloons.addEventListener('click', () => showScreen('photos'));

// PHOTO CAROUSEL: click to cycle top card
document.getElementById('photo-carousel').addEventListener('click', () => {
  if (photoCards.length === 0) return;
  const top = photoCards.shift(); // remove first element
  // animate it out
  top.style.transition = 'transform .5s ease, opacity .5s ease';
  top.style.transform = 'translateX(-150%) rotate(-10deg)';
  top.style.opacity = '0';
  // after animation, reset and push back
  setTimeout(() => {
    top.style.transition = 'none';
    top.style.transform = '';
    top.style.opacity = '1';
    photoCards.push(top);
    const container = document.getElementById('photo-carousel');
    photoCards.forEach((card, i) => {
      card.style.zIndex = String(photoCards.length - i);
      container.appendChild(card);
    });
  }, 500);
});

// go to message
btnToMessage.addEventListener('click', () => showScreen('message'));

// message card open
messageCard.addEventListener('click', () => {
  if (!finalMessageText.classList.contains('hidden')) return;
  tapOpen.classList.add('hidden');
  finalMessageText.classList.remove('hidden');
  finalMessageText.textContent = `Happy Birthday, ${recipientName}! 🎉\n\nYou deserve all the happiness, love, and smiles in the world. Enjoy your special day! ❤️`;
});

// next to final
btnToFinal.addEventListener('click', () => showScreen('final'));

// gift reveal
giftReveal.addEventListener('click', () => {
  giftReveal.classList.add('hidden');
  giftImageContainer.classList.remove('hidden');
});

// finally button
btnFinally.addEventListener('click', () => {
  giftImageContainer.classList.add('hidden');
  finalWish.classList.remove('hidden');

  // optional: fade out music smoothly
  if (bgMusic) {
    let vol = bgMusic.volume;
    const fade = setInterval(() => {
      vol -= 0.05;
      if (vol <= 0) {
        bgMusic.pause();
        bgMusic.volume = 1;
        clearInterval(fade);
      } else {
        bgMusic.volume = Math.max(0, vol);
      }
    }, 80);
  }
});

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  const ageMsg = document.getElementById('age-message');
  if (ageMsg) ageMsg.innerHTML = `A Cutiepie was born today, <br>${birthdayAge} years ago!`;

  // hide words initially
  wordEls.forEach(w => w.classList.remove('show'));

  // set initial photo stack
  const container = document.getElementById('photo-carousel');
  photoCards.forEach((card, i) => {
    card.style.zIndex = String(photoCards.length - i);
    container.appendChild(card);
  });

  // hide message text & final wish
  finalMessageText.classList.add('hidden');
  finalWish.classList.add('hidden');
});




