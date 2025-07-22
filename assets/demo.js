// Enhanced demo for non-technical users
const xrInterface = document.getElementById('xr-interface');
const notification = document.getElementById('notification');
const mainAction = document.getElementById('main-action');
const secondaryAction = document.getElementById('secondary-action');
const infoDisplay = document.getElementById('info-display');
const voiceIndicator = document.getElementById('voice-indicator');
const gestureHint = document.getElementById('gesture-hint');
const contextValue = document.getElementById('context-value');
const explanationContent = document.getElementById('explanation-content');
const adaptationList = document.getElementById('adaptation-list');
const scenarioCards = document.querySelectorAll('.scenario-card');
const resetBtn = document.querySelector('.reset-btn');

const scenarios = {
    bright: {
        class: 'xr-bright',
        context: 'Bright sunlight detected',
        mainText: 'Start Task',
        infoText: 'High contrast mode active',
        adaptations: [
            '🌟 Ultra-high contrast colors for visibility',
            '📱 Brighter interface elements',
            '🔆 Reduced transparency effects',
            '📊 Larger text for readability'
        ],
        explanation: 'When you\'re outdoors in bright sunlight, the interface automatically switches to high-contrast mode. This makes everything much easier to see, just like how your phone screen gets brighter in sunlight!'
    },
    distracted: {
        class: 'xr-distracted',
        context: 'Distractions detected',
        mainText: 'Focus Here',
        infoText: 'Attention guidance active',
        showNotification: true,
        adaptations: [
            '⚠️ Gentle attention reminders',
            '🎯 Highlighted important elements',
            '🔔 Subtle notification sounds',
            '⏸️ Paused non-essential animations'
        ],
        explanation: 'When the system detects you\'re getting distracted (maybe your phone buzzed or someone\'s talking), it gently guides your attention back to what\'s important. No harsh interruptions, just helpful nudges!'
    },
    handsBusy: {
        class: 'xr-hands-busy',
        context: 'Hands occupied',
        mainText: 'Voice: "Start"',
        infoText: 'Voice control enabled',
        buttonSize: 'large',
        showVoice: true,
        showGesture: true,
        adaptations: [
            '🎤 Voice commands activated',
            '👋 Hand gesture recognition',
            '🔘 Larger touch targets',
            '👁️ Eye-tracking navigation'
        ],
        explanation: 'When your hands are busy with tools or objects, the interface switches to voice and gesture control. You can still interact naturally without putting anything down!'
    },
    walking: {
        class: 'xr-walking',
        context: 'Movement detected',
        mainText: 'Quick Start',
        infoText: 'Simplified for movement',
        adaptations: [
            '🚶 Simplified interface layout',
            '🎯 Larger interaction areas',
            '⚡ Faster response times',
            '🔒 Reduced accidental inputs'
        ],
        explanation: 'While you\'re walking around, the interface becomes simpler and more stable. Buttons get bigger, menus get simpler, and the system prevents accidental taps from movement.'
    },
    noisy: {
        class: 'xr-noisy',
        context: 'Loud environment',
        mainText: 'Start Task',
        infoText: 'Visual feedback enhanced',
        adaptations: [
            '👁️ Enhanced visual feedback',
            '💡 Brighter status indicators',
            '📳 Haptic feedback increased',
            '🔕 Audio alerts replaced with visual'
        ],
        explanation: 'In noisy environments like construction sites, the interface relies more on visual and haptic feedback instead of sounds. You\'ll never miss important information!'
    },
    tired: {
        class: 'xr-tired',
        context: 'Low energy detected',
        mainText: 'Easy Start',
        infoText: 'Simplified interactions',
        adaptations: [
            '😌 Calmer, softer colors',
            '🎯 Fewer choices presented',
            '⏱️ Longer interaction timeouts',
            '🤖 More automated assistance'
        ],
        explanation: 'When you\'re tired, the interface becomes more forgiving and helpful. Colors are softer, there are fewer decisions to make, and the system provides more automatic assistance.'
    },
    reset: {
        class: 'xr-default',
        context: 'Normal conditions',
        mainText: 'Start Task',
        infoText: 'Ready to begin',
        adaptations: [],
        explanation: 'This is the standard interface - clean, balanced, and ready for normal use conditions.'
    }
};

function setScenario(scenario) {
    // Reset all elements
    xrInterface.className = 'xr-default';
    mainAction.style.fontSize = '';
    mainAction.style.padding = '';
    notification.classList.add('hidden');
    voiceIndicator.classList.add('hidden');
    gestureHint.classList.add('hidden');
    
    // Remove active state from all scenario cards
    scenarioCards.forEach(card => card.classList.remove('active'));
    
    // Apply scenario changes
    if (scenario.class) {
        xrInterface.className = scenario.class;
    }
    
    // Update context indicator
    contextValue.textContent = scenario.context;
    
    // Update button text and info display
    mainAction.textContent = scenario.mainText;
    infoDisplay.textContent = scenario.infoText;
    
    // Handle special adaptations
    if (scenario.buttonSize === 'large') {
        mainAction.style.fontSize = '1.4rem';
        mainAction.style.padding = '1.2rem 2.4rem';
        secondaryAction.style.fontSize = '1.2rem';
        secondaryAction.style.padding = '1rem 2rem';
    } else {
        secondaryAction.style.fontSize = '';
        secondaryAction.style.padding = '';
    }
    
    if (scenario.showNotification) {
        notification.classList.remove('hidden');
    }
    
    if (scenario.showVoice) {
        voiceIndicator.classList.remove('hidden');
    }
    
    if (scenario.showGesture) {
        gestureHint.classList.remove('hidden');
    }
    
    // Update explanation
    updateExplanation(scenario);
}

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

