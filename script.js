// ** STEP 1: DEFINE THE PERSONAL DETAILS HERE **
const recipientName = "Sujithra"; // Use the cute name from the video
const birthdayDate = "November 25th"; 
const birthdayAge = 16; // Example age, or remove if you don't want it.
// ---------------------------------------------

const screens = ['screen-start', 'screen-cake', 'screen-balloons', 'screen-photos', 'screen-message', 'screen-final'];
let currentScreenIndex = 0;
let poppedBalloons = 0;
let messageOpened = false; // Flag for the message card

// --- Core Navigation Function ---
function goToScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.remove('hidden');
        
        // Special actions on screen change
        if (screenId === 'screen-message' && !messageOpened) {
            document.querySelector('.message-card').onclick = openMessage;
        }
    }
}

// --- Screen 1: Personalization Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Set Personalized Greeting
    const ageMessage = document.getElementById('age-message');
    if (ageMessage) {
        ageMessage.innerHTML = A Cutiepie was born today, <br>${birthdayAge} years ago!;
    }
    
    // Set Final Message Text
    const finalMessageText = document.getElementById('final-message-text');
    if (finalMessageText) {
        finalMessageText.textContent = Happy Birthday, ${recipientName}! You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter, your smile, your kindness, and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that make your heart happy.;
    }

    // Initialize to the start screen
    goToScreen(screens[0]); 
});


// --- Screen 2: Cake Interactivity ---
function decorateCake() {
    // Mimic the confetti/decoration burst (requires external library for real confetti)
    alert("✨ Confetti burst! Cake is decorated! ✨"); 
    
    document.getElementById('btn-decorate').classList.add('hidden');
    document.getElementById('btn-light').classList.remove('hidden');
}

function lightCandle() {
    // Mimic lighting the candle animation
    alert("🔥 Candle is lit! Make a wish! 🕯"); 
    
    document.getElementById('btn-light').classList.add('hidden');
    document.getElementById('btn-next-cake').classList.remove('hidden');
}

// --- Screen 3: Balloon Interactivity ---
function popBalloon(balloon) {
    if (balloon.classList.contains('balloon-popped')) return;

    balloon.classList.add('balloon-popped');
    poppedBalloons++;
    
    // Simple confetti effect (visual only)
    alert("Pop!");

    if (poppedBalloons === 4) {
        // Show the hidden message pieces
        document.getElementById('balloon-message').classList.remove('hidden');
        document.getElementById('btn-next-balloons').classList.remove('hidden');
    }
}

// --- Screen 5: Message Interactivity ---
function openMessage() {
    if (messageOpened) return;
    
    document.querySelector('.tap-to-open').classList.add('hidden');
    document.getElementById('final-message-text').classList.remove('hidden');
    messageOpened = true;
}

// --- Screen 6: Final Reveal ---
function finalReveal() {
    document.querySelector('.gift-reveal').classList.add('hidden');
    document.getElementById('final-wish-text').classList.remove('hidden');
    // Final burst of confetti/animation here (requires external library)
    alert("💖 FINAL SURPRISE REVEALED! 💖");
}