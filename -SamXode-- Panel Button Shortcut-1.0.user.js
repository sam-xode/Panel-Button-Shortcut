// ==UserScript==
// @name         <SamXode/> Panel Button Shortcut
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Stylish panel with shortcut buttons, frosted glass, animations, automatic hide feature, and counter
// @author       SamXode
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let buttonHideTimeout, panelHideTimeout, count = 0;

    // Create the panel
    const panel = document.createElement('div');
    Object.assign(panel.style, {
        position: 'fixed',
        bottom: '80px',
        left: '20px',
        zIndex: '9999',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        padding: '10px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'transform 0.5s ease, opacity 0.3s ease',
        transform: 'translateX(-300px)',
        opacity: '0',
        backdropFilter: 'blur(10px)',
    });

    // Copyright text
    const copyright = document.createElement('div');
    Object.assign(copyright.style, {
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        marginTop: '5px',
        padding: '5px',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    });
    copyright.textContent = '<SamXode/>';

    // Counter display at the top
    const counterDisplay = document.createElement('div');
    Object.assign(counterDisplay.style, {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: '10px',
        transition: 'transform 0.3s ease, color 0.3s ease', // Smooth transition for the count display
    });
    counterDisplay.textContent = `Count: ${count}`;
    panel.appendChild(counterDisplay);

    // Container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginBottom = '10px';

    // Reset Button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    Object.assign(resetButton.style, {
        backgroundColor: '#D9534F',
        border: 'none',
        color: 'white',
        padding: '8px 12px', // Reset to original size
        textAlign: 'center',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    });

    resetButton.onclick = () => {
        count = 0;
        counterDisplay.textContent = `Count: ${count}`;
        counterDisplay.style.color = '#FFD700'; // Reset color to gold
        // Add animation on click
        resetButton.style.transform = 'scale(1.1)';
        setTimeout(() => resetButton.style.transform = 'scale(1)', 200); // Reset scale
    };

    resetButton.onmouseenter = () => {
        resetButton.style.backgroundColor = '#C9302C';
        resetButton.style.transform = 'scale(1.05)';
    };
    resetButton.onmouseleave = () => {
        resetButton.style.backgroundColor = '#D9534F';
        resetButton.style.transform = 'scale(1)';
    };

    // Count +1 Button (Slightly bigger than Reset)
    const countButton = document.createElement('button');
    countButton.textContent = 'Count +1';
    Object.assign(countButton.style, {
        backgroundColor: '#28a745', // Green color
        border: 'none',
        color: 'white',
        padding: '10px 15px', // Slightly bigger padding than reset button
        textAlign: 'center',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    });

    countButton.onclick = () => {
        count++;
        counterDisplay.textContent = `Count: ${count}`;
        counterDisplay.style.color = '#28a745'; // Change color to green when count increases
        // Add animation on click
        countButton.style.transform = 'scale(1.1)';
        setTimeout(() => countButton.style.transform = 'scale(1)', 200); // Reset scale
    };

    countButton.onmouseenter = () => {
        countButton.style.backgroundColor = '#218838';
        countButton.style.transform = 'scale(1.05)';
    };
    countButton.onmouseleave = () => {
        countButton.style.backgroundColor = '#28a745';
        countButton.style.transform = 'scale(1)';
    };

    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(countButton);
    panel.appendChild(buttonContainer);

    // Add other buttons like before
    const buttonData = [
        { label: 'Calculator', action: 'openCalculator' },
        { label: 'Discord', url: 'https://discord.com/channels/@me' },
        { label: 'Gmail', url: 'https://mail.google.com' },
        { label: 'Telegram', url: 'tg://', action: 'openTelegram' },
        { label: 'Notion', action: 'openNotion' },
    ];

    buttonData.forEach(button => {
        const btn = document.createElement('button');
        Object.assign(btn.style, {
            backgroundColor: '#444',
            border: 'none',
            color: 'white',
            padding: '10px 15px', // Original padding
            textAlign: 'center',
            fontSize: '14px', // Original font size
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        });
        btn.textContent = button.label;

        if (button.url) {
            btn.onclick = () => window.open(button.url, '_blank');
        } else if (button.action === 'openTelegram') {
            btn.onclick = () => window.location.href = button.url;
        } else if (button.action === 'openCalculator') {
            btn.onclick = () => window.open('calculator:', '_blank');
        } else if (button.action === 'openNotion') {
            btn.onclick = () => window.open('https://www.notion.so', '_blank');
        }

        btn.onmouseenter = () => {
            btn.style.backgroundColor = '#666';
            btn.style.transform = 'scale(1.05)';
        };
        btn.onmouseleave = () => {
            btn.style.backgroundColor = '#444';
            btn.style.transform = 'scale(1)';
        };

        panel.appendChild(btn);
    });

    // Add copyright to the panel
    panel.appendChild(copyright);

    document.body.appendChild(panel);

    // Create a trigger button
    const triggerButton = document.createElement('button');
    triggerButton.textContent = 'Panel 🛠️';

    // Detect page theme (light or dark) for the panel button
    const isPageDark = window.matchMedia('(prefers-color-scheme: dark)').matches ||
        getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)';

    // Adaptive colors for the button based on the theme
    const buttonBackgroundColor = isPageDark ? 'rgba(0, 123, 255, 0.1)' : 'rgba(255, 123, 0, 0.1)';
    const buttonTextColor = isPageDark ? '#fff' : '#000'; // Dynamic text color based on theme
    const buttonHoverBackgroundColor = isPageDark ? 'rgba(0, 123, 255, 0.2)' : 'rgba(255, 123, 0, 0.2)';
    const buttonHoverTextColor = isPageDark ? '#fff' : '#000';

    Object.assign(triggerButton.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: '9999',
        padding: '12px 20px',
        backgroundColor: buttonBackgroundColor,
        color: buttonTextColor, // Apply dynamic text color here
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '50px',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
    });

    // Adjust button on hover (adaptive color change)
    triggerButton.onmouseenter = () => {
        clearTimeout(buttonHideTimeout);
        triggerButton.style.transform = 'translateX(0px)';
        triggerButton.style.backgroundColor = buttonHoverBackgroundColor;
        triggerButton.style.color = buttonHoverTextColor; // Hover color should also adjust
        triggerButton.textContent = 'Panel 🛠️';
    };

    triggerButton.onmouseleave = () => {
        startButtonHideTimer();
        triggerButton.style.backgroundColor = buttonBackgroundColor;
        triggerButton.style.color = buttonTextColor; // Reset color when hover ends
    };

    triggerButton.onclick = () => {
        if (panel.style.transform === 'translateX(0px)') {
            hidePanel();
        } else {
            showPanel();
        }
    };

    document.body.appendChild(triggerButton);

    const showPanel = () => {
        clearTimeout(panelHideTimeout);
        panel.style.transform = 'translateX(0px)';
        panel.style.opacity = '1';
        startPanelHideTimer();
    };

    const hidePanel = () => {
        panel.style.transform = 'translateX(-300px)';
        panel.style.opacity = '0';
    };

    const startButtonHideTimer = () => {
        buttonHideTimeout = setTimeout(() => {
            triggerButton.style.transform = 'translateX(-60px)';
            triggerButton.textContent = '🛠️';
        }, 3000); // 3-second timer
    };

    const startPanelHideTimer = () => {
        panelHideTimeout = setTimeout(hidePanel, 5000); // 5-second timer
    };

    // Initialize the button hiding process
    startButtonHideTimer();

    // Panel will not hide when mouse is on it
    panel.onmouseenter = () => {
        clearTimeout(panelHideTimeout); // Prevent panel from hiding
    };

    panel.onmouseleave = () => {
        startPanelHideTimer(); // Hide after 5 seconds of mouse leaving
    };
})();