// ** STEP 1: DEFINE THE PERSONAL DETAILS HERE **
// CHANGE THESE VALUES to personalize the surprise!
const recipientName = "Sujithra"; 
const birthdayDate = "November 20th"; 
const birthdayAge = 16; // Example age, adjust as needed
// ---------------------------------------------

const screens = ['screen-start', 'screen-cake', 'screen-balloons', 'screen-photos', 'screen-message', 'screen-final'];
let currentScreenIndex = 0;
let poppedBalloons = 0;
let messageOpened = false; 

// --- Core Navigation Function (Called by all 'Next' and 'Start' buttons) ---
function goToScreen(screenId) {
    // 1. Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    // 2. Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.remove('hidden');
        
        // 3. Special action for the message card
        if (screenId === 'screen-message' && !messageOpened) {
            document.querySelector('.message-card').onclick = openMessage;
        }
    }
}

// --- Screen 2: Cake Interactivity ---
function decorateCake() {
    // This alert acts as the visual "confetti" animation placeholder
    alert("✨ Confetti burst! The cake is decorated! ✨"); 
    
    // Change buttons to progress the screen
    document.getElementById('btn-decorate').classList.add('hidden');
    document.getElementById('btn-light').classList.remove('hidden');
}

function lightCandle() {
    alert("🔥 Candle is lit! Make a wish! 🕯️"); 
    
    // Change buttons to progress the screen
    document.getElementById('btn-light').classList.add('hidden');
    document.getElementById('btn-next-cake').classList.remove('hidden');
}

// --- Screen 3: Balloon Interactivity ---
function popBalloon(balloon) {
    if (balloon.classList.contains('balloon-popped')) return;

    balloon.classList.add('balloon-popped');
    poppedBalloons++;
    
    // Simple notification for the pop
    console.log("Balloon popped!");

    if (poppedBalloons === 4) {
        // Show the hidden message pieces
        document.getElementById('balloon-message').classList.remove('hidden');
        // Wait a second for the message to animate, then show 'Next'
        setTimeout(() => {
            document.getElementById('btn-next-balloons').classList.remove('hidden');
        }, 1000);
    }
}

// --- Screen 5: Message Interactivity (Called by tapping the card) ---
function openMessage() {
    if (messageOpened) return;
    
    document.querySelector('.tap-to-open').classList.add('hidden');
    document.getElementById('final-message-text').classList.remove('hidden');
    messageOpened = true;
    // Remove the click handler so it doesn't run again
    document.querySelector('.message-card').onclick = null; 
}

// --- Screen 6: Final Reveal ---
function finalReveal() {
    document.querySelector('.gift-reveal').classList.add('hidden');
    document.getElementById('final-wish-text').classList.remove('hidden');
    alert("💖 FINAL SURPRISE REVEALED! Enjoy your special day! 💖");
    // Optionally, enable a replay button here
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

    // 3. Start the application on the initial screen
    goToScreen(screens[0]); 
});


