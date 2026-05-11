// --- THE MATRIX CANVAS ELEMENT ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to use in the rain (Katakana + Latin + Numbers)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const charArray = chars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drop positions to the top of the screen
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    // Draw a semi-transparent black rectangle over the canvas to create the trail effect
    // The alpha value (0.05) controls the length of the tail
    ctx.fillStyle = 'rgba(5, 5, 16, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color to Cyan to match your theme
    ctx.fillStyle = '#00ffff';
    ctx.font = fontSize + 'px monospace';

    // Loop over the drops
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // If the drop has reached the bottom, randomly reset it to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
    }
}

// Run the animation frame every 33 milliseconds
setInterval(draw, 33);

// Ensure canvas resizes perfectly if the user resizes their browser window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- TYPEWRITER EFFECT ---
const targetText = "> Welcome to the digital realm. Accessing data streams...";
const typingSpeed = 100; // Milliseconds between each keystroke (lower is faster)
let charIndex = 0;

function typeWriter() {
    // Find the h1 element in our HTML
    const typewriterElement = document.getElementById("typewriter");
    
    // If we haven't reached the end of the word...
    if (charIndex < targetText.length) {
        // Add the next letter to the HTML
        typewriterElement.innerHTML += targetText.charAt(charIndex);
        charIndex++;
        playTypeSound();
        
        // Wait, then run this function again for the next letter
        setTimeout(typeWriter, typingSpeed);
    }
}

// --- SCROLL REVEAL OBSERVER ---
// 1. Create the observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // If the element is visible on the screen
        if (entry.isIntersecting) {
            // Add the 'show' class to trigger the CSS animation
            entry.target.classList.add('show');
        } 
    });
}, {
    // Triggers when 10% of the element is visible
    threshold: 0.5 
});

// 2. Tell the observer which elements to watch
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// --- CUSTOM CROSSHAIR LOGIC ---
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

// 1. Make the custom cursor follow the mouse
window.addEventListener('mousemove', (e) => {
    // Get the exact X and Y coordinates of the mouse
    const posX = e.clientX;
    const posY = e.clientY;

    // Move the dot instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Use a tiny delay to move the ring for a smooth, trailing effect
    requestAnimationFrame(() => {
        cursorRing.style.left = `${posX}px`;
        cursorRing.style.top = `${posY}px`;
    });
});

// 2. Add the "Active/Targeting" effect when hovering over clickable items
const clickables = document.querySelectorAll('a, button, input, textarea');

clickables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
});

// --- AUDIO SYNTHESIZER ENGINE ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = false;

// The Sound Toggle Logic
const soundToggleBtn = document.getElementById('sound-toggle');
soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.innerText = soundEnabled ? "AUDIO: ON" : "AUDIO: OFF";
    
    if (soundEnabled && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    if (soundEnabled) playHoverSound(); 
});

// Sound Generator: Hover Blip
function playHoverSound() {
    if (!soundEnabled) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05); 
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1); 
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

// Sound Generator: Keystroke Tap
function playTypeSound() {
    if (!soundEnabled) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'square'; 
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03); 
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.03);
}

// Attach Hover Sound to all buttons and links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', playHoverSound);
});

// --- INTERACTIVE TERMINAL LOGIC ---
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// 1. The Dictionary of Secret Commands
const commands = {
    'help': 'AVAILABLE PROTOCOLS: \n> help   - displays this message \n> skills - access neural net capabilities \n> whoami - user identity query \n> clear  - wipe terminal history',
    'skills': 'ACCESSING NEURAL NET... \n> DATA: [Pandas, NumPy, SQL, Excel] \n> ML/AI: [Scikit-learn, LSTM, Isolation Forests] \n> CYBER: [Log Analysis, Steganography, Cryptography] \n> DEVOPS: [Docker, Fast API, Bash]',
    'whoami': 'Identity: Aman Joshi. \nDesignation: Data Analyst & CyberSec Specialist. \nStatus: Actively monitoring data streams.',
    'clear': 'CLS',
    'matrix': 'Wake up, Neo... The Matrix has you.',
    'hello': 'Hello, User. Awaiting input...'
};

// 2. Listen for the "Enter" key
terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase(); 
        
        if (command) {
            processCommand(command);
        }
        
        this.value = ''; 
    }
});

// 3. Process the command and print the result
function processCommand(cmd) {
    if (typeof playTypeSound === "function") playTypeSound(); 

    addTerminalLine(`guest@system:~$ ${cmd}`, 'terminal-line');

    if (cmd === 'clear') {
        terminalOutput.innerHTML = ''; 
    } else if (commands[cmd]) {
        addTerminalLine(commands[cmd], 'terminal-response'); 
    } else {
        addTerminalLine(`Command not found: ${cmd}. Type 'help' for a list of valid inputs.`, 'terminal-response');
    }

    const container = document.getElementById('terminal-container');
    container.scrollTop = container.scrollHeight;
}

// 4. Helper function to create the HTML text elements
function addTerminalLine(text, className) {
    const line = document.createElement('div');
    line.className = className;
    line.innerHTML = text.replace(/\n/g, '<br>'); 
    terminalOutput.appendChild(line);
}

// --- SYSTEM BOOT SEQUENCE ---
const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');

const bootSequence = [
    "INIT SYSTEM_CORE...",
    "LOADING KERNEL MODULES... [OK]",
    "MOUNTING VIRTUAL DRIVES... [OK]",
    "BYPASSING SECURITY FIREWALL... [WARNING]",
    "ESTABLISHING SECURE UPLINK... [OK]",
    "DECRYPTING UI ASSETS... [DONE]",
    "WELCOME, USER."
];

let bootIndex = 0;

function runBootSequence() {
    if (bootIndex < bootSequence.length) {
        const line = document.createElement('div');
        line.className = 'boot-line';
        
        if (bootSequence[bootIndex].includes("[WARNING]")) {
            line.innerHTML = bootSequence[bootIndex].replace("[WARNING]", "<span style='color: var(--neon-secondary);'>[WARNING]</span>");
        } else {
            line.innerText = bootSequence[bootIndex];
        }
        
        bootText.appendChild(line);
        bootIndex++;
        
        setTimeout(runBootSequence, Math.random() * 250 + 50);
    } else {
        setTimeout(() => {
            bootScreen.classList.add('fade-out');
            
            setTimeout(() => {
                bootScreen.style.display = 'none';
                setTimeout(typeWriter, 300); 
            }, 800);
            
        }, 500);
    }
}

// --- LIVE GITHUB FETCHING ---
const GH_USERNAME = 'AmanJoshi1604'; 

async function fetchGitHubRepos() {
    const projectContainer = document.getElementById('github-projects');
    
    try {
        const response = await fetch(`https://api.github.com/users/${GH_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();

        projectContainer.innerHTML = '';

        repos.forEach(repo => {
            if (repo.fork) return;

            const card = document.createElement('div');
            card.className = 'glass-panel project-card hidden'; 
            
            const description = repo.description ? repo.description : "No description provided for this repository.";

            card.innerHTML = `
                <h3>${repo.name.toUpperCase().replace(/-/g, ' ')}</h3>
                <p>${description}</p>
                <div class="repo-stats" style="margin-bottom: 20px; font-size: 12px; color: var(--neon-primary);">
                    <span>★ ${repo.stargazers_count} Stars</span> | 
                    <span>Main Language: ${repo.language || 'Plain Text'}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="neon-btn">VIEW_SOURCE</a>
            `;

            projectContainer.appendChild(card);
        });

        const newCards = projectContainer.querySelectorAll('.hidden');
        newCards.forEach((el) => observer.observe(el));

    } catch (error) {
        console.error("Uplink failed:", error);
        projectContainer.innerHTML = '<div class="glass-panel">ERROR: DATA UPLINK TIMEOUT.</div>';
    }
}

// --- SECURE UPLINK: FORM SUBMISSION ---
let submitted = false;

function showSuccess() {
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const contactForm = document.getElementById('contact-form');

    formStatus.style.display = "block";
    formStatus.innerText = "> UPLINK SUCCESSFUL. DATA LOGGED IN DATABASE.";
    formStatus.className = "success";
    
    contactForm.reset();
    submitBtn.classList.remove('transmitting');
    submitBtn.innerText = "Transmit_Data";
    
    submitted = false;
}

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', () => {
    submitBtn.classList.add('transmitting');
    submitBtn.innerText = "";
    formStatus.style.display = "block";
    formStatus.innerText = "> INITIALIZING DATA HANDSHAKE...";
    if (soundEnabled) playTypeSound();
});

// ==========================================
// --- 8. INITIALIZATION CONTROL ---
// ==========================================
window.addEventListener('load', () => {
    // 1. Fetch GitHub data
    fetchGitHubRepos(); 
    
    // 2. Start the Boot Sequence (which triggers the Typewriter automatically when done)
    runBootSequence();
    
    // 3. Auto-print the terminal hint exactly 2 seconds after the page loads
    setTimeout(() => {
        const output = document.getElementById('terminal-output');
        const hint = document.createElement('div');
        hint.className = 'terminal-response';
        hint.style.color = 'var(--neon-secondary)'; // Magenta so it pops
        hint.innerText = "> SYSTEM READY. Type 'help' to view available commands.";
        
        if (output) output.appendChild(hint);
    }, 2000); 
});