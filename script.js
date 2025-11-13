const recipientName = "Sujithra";
const birthdayAge = 16;

let poppedBalloons = 0;
let messageOpened = false;
let currentCardIndex = 0;
const totalCards = 5;

// --- Navigation ---
function goToScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('active');
}

// --- Cake ---
function decorateCake() {
  document.getElementById('cake-image').src = 'cake_decorated.png';
  document.getElementById('btn-decorate').classList.add('hidden');
  document.getElementById('btn-light').classList.remove('hidden');
}
function lightCandle() {
  document.getElementById('cake-image').src = 'cake_lit.png';
  document.getElementById('btn-light').classList.add('hidden');
  document.getElementById('btn-next-cake').classList.remove('hidden');
}

// --- Balloons ---
function popBalloon(b) {
  if (b.classList.contains('balloon-popped')) return;
  b.classList.add('balloon-popped');
  poppedBalloons++;

  // Reveal each word one by one
  if (poppedBalloons <= 4) {
    document.getElementById(`word${poppedBalloons}`).classList.remove('hidden');
    document.getElementById(`word${poppedBalloons}`).classList.add('show');
  }

  if (poppedBalloons === 4) {
    setTimeout(() => {
      document.getElementById('btn-next-balloons').classList.remove('hidden');
    }, 1000);
  }
}

// --- Photos ---
function swipeCard() {
  const cards = document.querySelectorAll('.photo-card');
  const card = cards[currentCardIndex % totalCards];
  card.style.transform = 'translateX(-150%) rotate(-10deg)';
  card.style.opacity = 0;
  setTimeout(() => {
    card.style.transition = 'none';
    card.style.transform = 'translateY(0)';
    card.style.opacity = 1;
    card.style.zIndex = 0;
    setTimeout(() => card.style.transition = 'transform 0.5s, opacity 0.5s', 50);
  }, 500);
  currentCardIndex++;
}

// --- Message ---
function openMessage() {
  if (messageOpened) return;
  document.querySelector('.tap-to-open').classList.add('hidden');
  document.getElementById('final-message-text').classList.remove('hidden');
  messageOpened = true;
}

// --- Gift Reveal ---
function finalReveal() {
  document.querySelector('.gift-reveal').classList.add('hidden');
  document.getElementById('gift-image-container').classList.remove('hidden');
}

// --- Show Final Message ---
function showFinalMessage() {
  document.getElementById('gift-image-container').classList.add('hidden');
  document.getElementById('final-wish-text').classList.remove('hidden');
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('age-message').innerHTML = `A Cutiepie was born today, <br>${birthdayAge} years ago!`;
  document.getElementById('final-message-text').textContent = 
    `Happy Birthday, ${recipientName}! 💖 You deserve endless smiles, love, and magic moments today and always!`;
});



