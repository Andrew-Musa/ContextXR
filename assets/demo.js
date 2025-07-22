// Enhanced demo for smart glasses experience
const notification = document.getElementById('notification');
const scenarioBg = document.getElementById('scenario-bg');
const scenarioControls = document.getElementById('scenario-controls');
const cursorDebug = document.getElementById('cursor-debug');
const glassesOverlay = document.getElementById('glasses-overlay');
const glassesFrame = document.querySelector('.glasses-frame');

// Scenarios configuration
const scenarios = {
    bright: {
        name: 'Bright Sunlight',
        background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        controls: [
            { id: 'sunny', label: 'Toggle Sunglasses Mode' },
            { id: 'contrast', label: 'Increase Contrast' },
            { id: 'brightness', label: 'Adjust Brightness' }
        ],
        onSelect: () => {
            // Initial state for bright scenario
            showNotification('Sunglasses mode activated', 'High contrast enabled for better visibility');
        },
        onControl: (controlId) => {
            switch(controlId) {
                case 'sunny':
                    toggleGlassesTint('rgba(0, 0, 0, 0.3)');
                    break;
                case 'contrast':
                    increaseContrast();
                    break;
            }
        }
    },
    driving: {
        name: 'Driving',
        background: 'url(https://images.unsplash.com/photo-1503376785-2cfd670d79e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        controls: [
            { id: 'notification', label: 'Show Notification' },
            { id: 'navigation', label: 'Start Navigation' },
            { id: 'music', label: 'Play Music' }
        ],
        onSelect: () => {
            // Initial state for driving scenario
            showNotification('Driving mode activated', 'Minimal interface for safety');
            setupDrivingMode();
        },
        onControl: (controlId) => {
            if (controlId === 'notification') {
                showNotification('New Message', 'Meeting in 15 minutes', {
                    position: 'top-right',
                    priority: 'low'
                });
            }
        }
    },
    meeting: {
        name: 'In a Meeting',
        background: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        controls: [
            { id: 'mute', label: 'Mute Notifications' },
            { id: 'notes', label: 'Take Notes' },
            { id: 'reminder', label: 'Set Reminder' }
        ],
        onSelect: () => {
            showNotification('Work mode activated', 'Minimal notifications enabled');
        }
    },
    handsBusy: {
        name: 'Hands Full',
        background: 'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        controls: [
            { id: 'voice', label: 'Voice Commands' },
            { id: 'gesture', label: 'Gesture Control' },
            { id: 'assistant', label: 'Call Assistant' }
        ],
        onSelect: () => {
            showNotification('Hands-free mode', 'Voice commands and gestures active');
        }
    }
};

// Current active scenario
let activeScenario = null;
let notificationTimeout = null;

// Initialize the application
function init() {
    setupEventListeners();
    setupAREffects();
    // Set default scenario
    setActiveScenario('bright');
}

// Set up event listeners
function setupEventListeners() {
    // Scenario selection
    document.querySelectorAll('.scenario-item').forEach(item => {
        item.addEventListener('click', () => {
            const scenarioId = item.dataset.scenario;
            setActiveScenario(scenarioId);
        });
    });
    
    // Mouse movement tracking for cursor position
    document.addEventListener('mousemove', (e) => {
        updateCursorPosition(e);
        updateGlassesPerspective(e);
    });
}

// Set active scenario
function setActiveScenario(scenarioId) {
    const scenario = scenarios[scenarioId];
    if (!scenario) return;
    
    // Update UI
    document.querySelectorAll('.scenario-item').forEach(item => {
        item.classList.toggle('active', item.dataset.scenario === scenarioId);
    });
    
    // Update background
    scenarioBg.style.backgroundImage = scenario.background;
    
    // Update controls
    updateScenarioControls(scenario.controls);
    
    // Call scenario's onSelect callback
    if (scenario.onSelect) scenario.onSelect();
    
    activeScenario = scenarioId;
}

// Update scenario controls
function updateScenarioControls(controls) {
    scenarioControls.innerHTML = '';
    
    if (!controls || !controls.length) return;
    
    controls.forEach(control => {
        const button = document.createElement('button');
        button.className = 'control-button';
        button.textContent = control.label;
        button.dataset.controlId = control.id;
        button.addEventListener('click', () => {
            const scenario = scenarios[activeScenario];
            if (scenario && scenario.onControl) {
                scenario.onControl(control.id);
            }
        });
        scenarioControls.appendChild(button);
    });
}

// Show notification
function showNotification(title, message, options = {}) {
    const notification = document.getElementById('notification');
    const content = notification.querySelector('.notification-content');
    
    // Update content
    content.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;
    
    // Position the notification
    if (options.position === 'center') {
        notification.style.left = '50%';
        notification.style.right = 'auto';
        notification.style.top = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
    } else {
        notification.style.left = 'auto';
        notification.style.right = '20px';
        notification.style.top = '20px';
        notification.style.transform = 'translateY(0)';
    }
    
    // Show notification
    notification.classList.add('visible');
    
    // Auto-hide after delay
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
        notification.classList.remove('visible');
    }, options.priority === 'high' ? 8000 : 4000);
}

// Update cursor position (for debugging and interaction)
function updateCursorPosition(e) {
    // For debugging cursor position
    if (cursorDebug) {
        cursorDebug.style.left = `${e.clientX}px`;
        cursorDebug.style.top = `${e.clientY}px`;
    }
}

// Update glasses perspective based on cursor position
function updateGlassesPerspective(e) {
    if (!glassesFrame) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    glassesFrame.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
}

// Toggle glasses tint (for sunglasses mode)
function toggleGlassesTint(color) {
    const tint = glassesFrame.style.getPropertyValue('--tint-color');
    if (tint) {
        glassesFrame.style.setProperty('--tint-color', 'transparent');
    } else {
        glassesFrame.style.setProperty('--tint-color', color);
    }
}

// Increase contrast (for bright conditions)
function increaseContrast() {
    const current = parseFloat(document.body.style.getPropertyValue('--contrast') || '1');
    document.body.style.setProperty('--contrast', Math.min(current + 0.2, 2));
}

// Setup driving mode specific interactions
function setupDrivingMode() {
    // Add special behavior for driving mode
    const notification = document.getElementById('notification');
    
    // Make notification less obtrusive by default
    notification.style.background = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = 'white';
    notification.style.maxWidth = '200px';
    notification.style.padding = '0.75rem';
    notification.style.fontSize = '0.9rem';
    
    // Add hover effect to expand notification
    notification.addEventListener('mouseenter', () => {
        notification.style.maxWidth = '300px';
        notification.style.background = 'rgba(255, 255, 255, 0.95)';
        notification.style.color = '#1a1a1a';
        notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    });
    
    notification.addEventListener('mouseleave', () => {
        notification.style.maxWidth = '200px';
        notification.style.background = 'rgba(0, 0, 0, 0.7)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
}

// Setup AR effects
function setupAREffects() {
    // Add a subtle scanning line animation
    const scanLine = document.createElement('div');
    scanLine.className = 'ar-scan-line';
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
        animation: scan 3s ease-in-out infinite;
        z-index: 1001;
        pointer-events: none;
    `;
    document.body.appendChild(scanLine);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Update explanation
function updateExplanation(scenario) {
    const explanationHTML = `
        <p><strong>${scenario.explanation}</strong></p>
        ${scenario.adaptations.length > 0 ? `
        <div class="adaptations-title">🔧 Smart Adaptations:</div>
        <ul class="adaptations-list">
            ${scenario.adaptations.map(adaptation => `<li>${adaptation}</li>`).join('')}
        </ul>
        ` : ''}
    `;
    
    explanationContent.innerHTML = explanationHTML;
}

// Add click handlers for scenario cards
scenarioCards.forEach(card => {
    card.addEventListener('click', () => {
        const scenarioKey = card.dataset.scenario;
        setScenario(scenarios[scenarioKey]);
        
        // Add active state to clicked card
        card.classList.add('active');
        
        // Add a subtle animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// Add click handler for reset button
resetBtn.addEventListener('click', () => {
    setScenario(scenarios.reset);
});

// Add hover effects for better interactivity
scenarioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = 'translateY(-2px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('active')) {
            card.style.transform = '';
        }
    });
});

// Set initial state
setScenario(scenarios.reset);

// Add some interactive feedback to the interface buttons
mainAction.addEventListener('click', () => {
    infoDisplay.textContent = 'Task started! Interface adapting...';
    setTimeout(() => {
        const currentScenario = Object.values(scenarios).find(s => 
            xrInterface.classList.contains(s.class)
        ) || scenarios.reset;
        infoDisplay.textContent = currentScenario.infoText;
    }, 2000);
});

secondaryAction.addEventListener('click', () => {
    infoDisplay.textContent = 'Settings optimized for current context';
    setTimeout(() => {
        const currentScenario = Object.values(scenarios).find(s => 
            xrInterface.classList.contains(s.class)
        ) || scenarios.reset;
        infoDisplay.textContent = currentScenario.infoText;
    }, 1500);
});

