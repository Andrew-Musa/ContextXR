// Simple, clear demo for non-technical users
const xrInterface = document.getElementById('xr-interface');
const notification = document.getElementById('notification');
const mainAction = document.getElementById('main-action');
const scenarioBtns = document.querySelectorAll('.scenario-btn');
const explanation = document.getElementById('simple-explanation');

const scenarios = {
    bright: {
        class: 'xr-bright',
        buttonSize: '',
        notification: false,
        text: 'In a bright room, the interface uses high contrast colors so everything stays visible.'
    },
    distracted: {
        class: 'xr-distracted',
        buttonSize: '',
        notification: true,
        text: 'If you get distracted, the interface shows a friendly reminder to help you focus.'
    },
    handsBusy: {
        class: 'xr-default',
        buttonSize: 'large',
        notification: false,
        text: 'If your hands are busy, buttons become much larger so they are easier to press.'
    },
    reset: {
        class: 'xr-default',
        buttonSize: '',
        notification: false,
        text: 'The interface is back to normal.'
    }
};

function setScenario(scenario) {
    // Reset
    xrInterface.className = 'xr-default';
    mainAction.style.fontSize = '';
    mainAction.style.padding = '';
    notification.classList.add('hidden');

    // Apply scenario
    if (scenario.class) xrInterface.classList.add(scenario.class);
    if (scenario.buttonSize === 'large') {
        mainAction.style.fontSize = '1.7rem';
        mainAction.style.padding = '1.3rem 2.8rem';
    }
    if (scenario.notification) {
        notification.classList.remove('hidden');
    }
    explanation.textContent = scenario.text;
}

scenarioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setScenario(scenarios[btn.dataset.scenario]);
    });
});

// Set initial state
setScenario(scenarios.reset);

