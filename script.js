const recipientName = "Sujithra"; 
const birthdayDate = "November 25th"; 
const birthdayAge = 16;

const screens = ['screen-start', 'screen-cake', 'screen-balloons', 'screen-photos', 'screen-message', 'screen-final'];
let poppedBalloons = 0;
let messageOpened = false; 
let currentCardIndex = 0; 

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.remove('hidden');
    }
}

function decorateCake() {
    document.getElementById('cake-image').src = 'cake_decorated.png'; 
    alert("✨ Confetti burst! The cake is decorated! ✨");
    document.getElementById('btn-decorate').classList.add('hidden');
    document.getElementById('btn-light').classList.remove('hidden');
}

function lightCandle() {
    document.getElementById('cake-image').src = 'cake_lit.png'; 
    alert("🔥 Candle is lit! Make a wish! 🕯️");
    document.getElementById('btn-light').classList.add('hidden');
    document.getElementById('btn-next-cake').classList.remove('hidden');
}

function popBalloon(balloon) {
    if (balloon.classList.contains('balloon-popped')) return;
    balloon.classList.add('balloon-popped');
    poppedBalloons++;

    const word = balloon.getAttribute('data-word');
    const messageDiv = document.getElementById('balloon-message');
    messageDiv.innerHTML += `<span style="margin:0 5px;">${word}</span>`;

    if (poppedBalloons === 4) {
        setTimeout(() => {
            document.getElementById('btn-next-balloons').classList.remove('hidden');
        }, 1000);
    }
}

function swipeCard() {
    const cards = document.querySelectorAll('.photo-card');
    const cardToMoveIndex = currentCardIndex % cards.length;
    const cardToMove = cards[cardToMoveIndex];
    cardToMove.style.transform = `translateX(-150%) rotate(-10deg)`;
    cardToMove.style.opacity = 0;

    setTimeout(() => {
        cardToMove.style.transition = 'none'; 
        cardToMove.style.transform = `translateY(10px) rotate(2deg)`;
        cardToMove.style.zIndex = 1;
        setTimeout(() => {
            cardToMove.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            cardToMove.style.opacity = 1;
        }, 50);
    }, 500);

    currentCardIndex++; 
}

function finalReveal() {
    document.querySelector('.gift-reveal').classList.add('hidden');
    document.getElementById('final-image').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('final-wish-text').classList.remove('hidden');
    }, 1500);
    alert("💖 FINAL SURPRISE REVEALED! Enjoy your special day! 💖");
}

document.addEventListener('DOMContentLoaded', () => {
    const ageMessage = document.getElementById('age-message');
    if (ageMessage) {
        ageMessage.innerHTML = `A Cutiepie was born today, <br>${birthdayAge} years ago!`;
    }

    const finalMessageText = document.getElementById('final-message-text');
    const messageCard = document.querySelector('.message-card');
    const tapOpen = document.querySelector('.tap-to-open');

    messageCard.addEventListener('click', () => {
        if (!finalMessageText.classList.contains('hidden')) return;
        tapOpen.classList.add('hidden');
        finalMessageText.classList.remove('hidden');

        finalMessageText.textContent = `Happy Birthday, ${recipientName}! 🎉\n\nYou deserve all the happiness, love, and smiles in the world. Enjoy your special day! ❤️ There is few things to tell you, life la evlo mudiyumo avlo achieve pannu onakku oru support ah na eppayume iruppan.  Indha achievements la encourage panna ippo Amma namma kooda illaye nu nenaikkadha, life long na onakku oru amma va, appa va, friend ah, anna na koodave iruppan...`;
        finalMessageText.style.maxHeight = "300px";
        finalMessageText.style.overflowY = "auto";
        finalMessageText.style.whiteSpace = "pre-line";
        finalMessageText.style.paddingRight = "8px";
    });

    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {
        document.body.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });

    goToScreen(screens[0]);
});

