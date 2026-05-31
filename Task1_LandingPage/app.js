/* ==========================================================================
   STUDYHUB INTERACTION SCRIPT
   Description: Handles the responsive menu toggle, newsletter signup mock integration, 
                and a functional Pomodoro Timer showcase.
   Created for: Web Dev 101 Assignment / Internship Project
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. MOBILE MENU TOGGLE
       ---------------------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu active class when hamburger is clicked
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close the mobile menu automatically when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });


    /* ----------------------------------------------------------------------
       2. INTERACTIVE POMODORO TIMER WIDGET
       ---------------------------------------------------------------------- */
    // DOM Elements
    const timerDisplay = document.getElementById('timerDisplay');
    const timerStartBtn = document.getElementById('timerStart');
    const timerResetBtn = document.getElementById('timerReset');
    const timerStatusText = document.getElementById('timerStatus');
    
    // Mode Buttons
    const modeFocusBtn = document.getElementById('modeFocus');
    const modeShortBtn = document.getElementById('modeShort');
    const modeLongBtn = document.getElementById('modeLong');
    const modeBtns = [modeFocusBtn, modeShortBtn, modeLongBtn];

    // Timer state variables
    let timeLeft = 1500;        // Default to 25 minutes (in seconds)
    let timerInterval = null;   // Reference to the active setInterval loop
    let isRunning = false;      // Track whether the timer is currently counting down
    let currentModeDuration = 1500; // Store the original duration of the active mode

    // Format seconds into MM:SS display string
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        // Pad with leading zeros if single digits (e.g. 9 becomes "09")
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        const displaySeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        
        return `${displayMinutes}:${displaySeconds}`;
    }

    // Refresh display visual text
    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }

    // Main interval tick logic
    function tick() {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            // Timer expired
            clearInterval(timerInterval);
            isRunning = false;
            timerStartBtn.textContent = 'Start';
            timerStatusText.textContent = '🎉 Time is up! Take a well-deserved break.';
            
            // Play a standard system notification sound if browser permissions allow
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.value = 520; // Nice clear note
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3); // Play for 300ms
            } catch (e) {
                console.log('Audio contextual beep blocked by browser permissions until user interacts.');
            }
        }
    }

    // Toggle start and pause states
    function startTimer() {
        if (isRunning) {
            // Pause timer
            clearInterval(timerInterval);
            isRunning = false;
            timerStartBtn.textContent = 'Resume';
            timerStatusText.textContent = 'Timer paused.';
        } else {
            // Start timer
            isRunning = true;
            timerStartBtn.textContent = 'Pause';
            timerStatusText.textContent = 'Stay focused! You got this.';
            timerInterval = setInterval(tick, 1000);
        }
    }

    // Reset timer state back to mode defaults
    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = currentModeDuration;
        updateDisplay();
        timerStartBtn.textContent = 'Start';
        timerStatusText.textContent = 'Timer reset. Ready to focus?';
    }

    // Switch timer modes (Focus / Short Break / Long Break)
    function changeMode(modeDuration, selectedBtn, statusText) {
        // Clear running interval if switching modes mid-run
        clearInterval(timerInterval);
        isRunning = false;
        
        // Update states
        currentModeDuration = modeDuration;
        timeLeft = modeDuration;
        updateDisplay();
        
        timerStartBtn.textContent = 'Start';
        timerStatusText.textContent = statusText;

        // Toggle active visual class on mode buttons
        modeBtns.forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        selectedBtn.classList.add('active');
    }

    // Bind event listeners for controls
    if (timerStartBtn) {
        timerStartBtn.addEventListener('click', startTimer);
    }
    
    if (timerResetBtn) {
        timerResetBtn.addEventListener('click', resetTimer);
    }

    // Bind event listeners for mode switches
    if (modeFocusBtn) {
        modeFocusBtn.addEventListener('click', () => {
            changeMode(1500, modeFocusBtn, 'Focus mode active. Let\'s get to work!');
        });
    }

    if (modeShortBtn) {
        modeShortBtn.addEventListener('click', () => {
            changeMode(300, modeShortBtn, 'Short break active. Stretch and take a sip of water.');
        });
    }

    if (modeLongBtn) {
        modeLongBtn.addEventListener('click', () => {
            changeMode(900, modeLongBtn, 'Long break active. Rest up, you earned it.');
        });
    }

    // Initialize timer visual display
    updateDisplay();


    /* ----------------------------------------------------------------------
       3. NEWSLETTER FORM MOCK SUBMISSION
       ---------------------------------------------------------------------- */
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterFeedback = document.getElementById('newsletterFeedback');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop standard browser page reload
            
            const emailValue = newsletterEmail.value.trim();
            
            if (emailValue) {
                // Simple visual mockup simulation of successful sign-up
                newsletterFeedback.classList.remove('d-none');
                newsletterEmail.value = ''; // Reset field
                
                // Hide confirmation message after 5 seconds
                setTimeout(() => {
                    newsletterFeedback.classList.add('d-none');
                }, 5000);
            }
        });
    }
});
