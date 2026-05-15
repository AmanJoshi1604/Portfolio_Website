# 💻 Cyberpunk Terminal Portfolio

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

A highly interactive, cyberpunk-themed developer portfolio designed to mimic a secure mainframe terminal. Built entirely with vanilla front-end technologies, this portfolio focuses on immersive UX, dynamic data fetching, and high-performance animations without relying on heavy frameworks.

## ✨ Features

* **System Boot Pre-loader:** A simulated terminal boot sequence that executes before revealing the main interface.
* **Interactive Terminal:** A fully functional command-line interface Easter egg where users can type commands (e.g., `help`, `skills`, `whoami`) to retrieve data.
* **Live GitHub Data Uplink:** Automatically fetches and displays the most recently updated repositories using the GitHub API, ensuring the portfolio is always up-to-date.
* **Web Audio API Synthesizer:** Mathematically generated sci-fi sound effects (hover blips, keystroke taps) generated directly in the browser for zero-latency audio feedback.
* **Matrix Rain Engine:** A performant `<canvas>` based background rendering the classic falling code effect.
* **Custom UI Elements:** A target-tracking crosshair cursor, a glowing neon scrollbar, and a seamless infinite-scrolling tech stack marquee.
* **Secure Contact Uplink:** A functional contact form integrated with a headless Google Forms backend (via hidden iframe) to securely log messages without breaking the cyberpunk immersion.

## 🛠️ Tech Stack

* **Structure:** HTML5
* **Styling:** CSS3 (Custom Properties/Variables, Grid, Flexbox, Keyframe Animations, Backdrop Filters)
* **Logic & Interactivity:** Vanilla JavaScript (ES6+)
* **APIs Used:** Web Audio API, GitHub REST API (`fetch`), Intersection Observer API

## 🚀 Getting Started

Since this project uses pure HTML, CSS, and JS, there is no build process or package manager required.

### Prerequisites
* A modern web browser (Chrome, Firefox, Safari, Edge).

### Installation
1. Clone the repository:

```bash
   git clone [https://github.com/AmanJoshi1604/cyberpunk-portfolio.git](https://github.com/AmanJoshi1604/cyberpunk-portfolio.git)
```

2. Navigate to the project directory:
```bash
cd cyberpunk-portfolio
```


3. Open `index.html` in your preferred web browser.

*Note: For the GitHub fetch to work optimally during local development, ensure you are connected to the internet. If you encounter CORS issues with local files depending on your browser, running a simple local server (like VS Code's Live Server extension or `python -m http.server`) is recommended.*

## 📂 Project Structure

```text
📁 cyberpunk-portfolio
├── 📄 index.html      # Main HTML structure and form logic
├── 📁 css
│   └── 📄 style.css   # Neon variables, grid layouts, animations
└── 📁 js
    └── 📄 script.js   # Audio engine, terminal logic, GitHub fetch

```

## ⚙️ Configuration

To customize this portfolio for your own use:

1. **GitHub Uplink:** In `js/script.js`, change the `GH_USERNAME` constant to your GitHub username to fetch your own repositories.
2. **Contact Form:** In `index.html`, update the `<form>` `action` URL and the `entry.[ID]` names to match your own headless Google Form setup.
3. **Terminal Commands:** Modify the `commands` dictionary in `js/script.js` to add personalized Easter eggs.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=%23).