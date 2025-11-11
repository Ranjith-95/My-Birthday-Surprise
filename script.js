// ** STEP 1: DEFINE THE PERSONAL DETAILS HERE **
// CHANGE THESE VALUES to personalize the surprise!
const recipientName = "Sujithra"; 
const birthdayDate = "November 25th"; 
const birthdayAge = 16; 
// ---------------------------------------------

const screens = ['screen-start', 'screen-cake', 'screen-balloons', 'screen-photos', 'screen-message', 'screen-final'];
let poppedBalloons = 0;
let messageOpened = false; 

// Variables for the new photo swiping feature
let currentCardIndex = 0; 
const totalCards = 3; 

// --- Core Navigation Function ---
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.remove('hidden');
        
        if (screenId === 'screen-message' && !messageOpened) {
            document.querySelector('.message-card').onclick = openMessage;
        }
    }
}

// --- Screen 2: Cake Interactivity ---
function decorateCake() {
    // CRITICAL: Change image source to the decorated version
    document.getElementById('cake-image').src = 'cake_decorated.png'; 
    
    alert("✨ Confetti burst! The cake is decorated! ✨"); 
    
    document.getElementById('btn-decorate').classList.add('hidden');
    document.getElementById('btn-light').classList.remove('hidden');
}

function lightCandle() {
    // CRITICAL: Change image source to the version with the lit candle
    document.getElementById('cake-image').src = 'cake_lit.png'; 
    
    alert("🔥 Candle is lit! Make a wish! 🕯️"); 
    
    document.getElementById('btn-light').classList.add('hidden');
    document.getElementById('btn-next-cake').classList.remove('hidden');
}

// --- Screen 3: Balloon Interactivity ---
function popBalloon(balloon) {
    if (balloon.classList.contains('balloon-popped')) return;

    balloon.classList.add('balloon-popped');
    poppedBalloons++;
    
    console.log("Balloon popped!");

    if (poppedBalloons === 4) {
        document.getElementById('balloon-message').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('btn-next-balloons').classList.remove('hidden');
        }, 1000);
    }
}

// --- Screen 4: Photo Swiping Interactivity ---
function swipeCard() {
    const cards = document.querySelectorAll('.photo-card');

    const cardToMoveIndex = currentCardIndex % totalCards;
    const cardToMove = cards[cardToMoveIndex];

    // 1. Animate the card out
    cardToMove.style.transform = `translateX(-150%) rotate(-10deg)`;
    cardToMove.style.opacity = 0;
    
    // 2. Move the card to the back of the stack after the animation finishes (500ms)
    setTimeout(() => {
        cardToMove.style.transition = 'none'; 
        
        // Reset to initial stack position
        const initialRotate = (currentCardIndex % 2 === 0) ? 'rotate(2deg)' : 'rotate(-3deg)';
        const initialY = (currentCardIndex % 3) * 5; 

        cardToMove.style.transform = `translateY(${initialY}px) ${initialRotate}`;
        cardToMove.style.zIndex = currentCardIndex; 

        // Re-enable transition
        setTimeout(() => {
            cardToMove.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            cardToMove.style.opacity = 1; 
        }, 50);

    }, 500); 

    currentCardIndex++; 
}

// --- Screen 5: Message Interactivity ---
function openMessage() {
    if (messageOpened) return;
    
    document.querySelector('.tap-to-open').classList.add('hidden');
    document.getElementById('final-message-text').classList.remove('hidden');
    messageOpened = true;
    document.querySelector('.message-card').onclick = null; 
}

// --- Screen 6: Final Reveal ---
function finalReveal() {
    document.querySelector('.gift-reveal').classList.add('hidden');
    document.getElementById('final-wish-text').classList.remove('hidden');
    alert("💖 FINAL SURPRISE REVEALED! Enjoy your special day! 💖");
}

// --- Initial Setup (Runs once when the page loads) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Personalized Greeting
    const ageMessage = document.getElementById('age-message');
    if (ageMessage) {
        ageMessage.innerHTML = `A Cutiepie was born today, <br>${birthdayAge} years ago!`;
    }
    
    // 2. Set Final Message Text
    const finalMessageText = document.getElementById('final-message-text');
    if (finalMessageText) {
        finalMessageText.textContent = `Happy Birthday, ${recipientName}! You deserve all the happiness, love, and smiles in the world today and always. Your smile, kindness, and way of making people feel truly cared for make you special. I hope your day is filled with laughter, surprises, and moments that make your heart happy.`;
    }

    // 3. Set the initial cake image source
    const cakeImage = document.getElementById('cake-image');
    if (cakeImage) {
        cakeImage.src = 'cake_undecorated.png'; 
    }

    // 4. Start the application on the initial screen
    goToScreen(screens[0]); 
});
