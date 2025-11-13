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

// start music (called only when user clicks start)
function startMusic() {
  // try resume (some browsers need user gesture)
  if (bgMusic) {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => { /* ignore autoplay block */ });
    }
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
    if (w) {
      // add show class to animate opacity/translate
      w.classList.add('show');
    }
    poppedCount++;
    // when all popped, show next button
    if (poppedCount >= 4) {
      setTimeout(() => btnNextBalloons.classList.remove('hidden'), 500);
    }
  });
});

// next from balloons to photos
btnNextBalloons.addEventListener('click', () => showScreen('photos'));

// PHOTO CAROUSEL: simple cycle - click moves top card to bottom
document.getElementById('photo-carousel').addEventListener('click', () => {
  if (photoCards.length === 0) return;
  const top = photoCards.shift(); // remove first element
  // animate it out
  top.style.transition = 'transform .5s ease, opacity .5s ease';
  top.style.transform = 'translateX(-150%) rotate(-10deg)';
  top.style.opacity = '0';
  // after animation, reset and put at end
  setTimeout(() => {
    top.style.transition = 'none';
    top.style.transform = ''; // will use CSS nth-child stacked look after reflow
    top.style.opacity = '1';
    photoCards.push(top);
    // re-append all cards in order to update stacking order
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
  // set welcome text
  const ageMsg = document.getElementById('age-message');
  if (ageMsg) ageMsg.innerHTML = `A Cutiepie was born today, <br>${birthdayAge} years ago!`;

  // hide words initially (they are visible in DOM but not shown)
  wordEls.forEach(w => w.classList.remove('show'));

  // set initial photo z-index stack
  const container = document.getElementById('photo-carousel');
  photoCards.forEach((card, i) => {
    card.style.zIndex = String(photoCards.length - i);
    container.appendChild(card);
  });

  // ensure final message hidden
  finalMessageText.classList.add('hidden');
  finalWish.classList.add('hidden');
});




