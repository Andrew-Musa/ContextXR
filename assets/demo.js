// Advanced demo: Adapt UI based on multiple context factors
const contextForm = document.getElementById('context-form');
const xrInterface = document.getElementById('xr-interface');
const notification = document.getElementById('notification');
const statusIndicator = document.getElementById('status-indicator');
const userStateList = document.getElementById('user-state-list');
const adaptationLog = document.getElementById('adaptation-log');
const explanationContent = document.getElementById('explanation-content');
const accessibilityToggle = document.getElementById('accessibility-toggle');
const mainAction = document.getElementById('main-action');
const slider = document.getElementById('slider');

let accessibilityMode = false;
let lastState = {};

const explanations = {
    bright: 'Bright environment detected. High-contrast theme enabled.',
    dim: 'Dim environment detected. Dark mode enabled.',
    distracted: 'User distracted. Notification shown to regain focus.',
    focused: 'User focused. Standard UI.',
    handsBusy: 'Hands are busy. Enlarging buttons for easier interaction.',
    lowBattery: 'Low battery. Disabling heavy features and showing warning.',
    noisy: 'Noisy environment. Visual cues enabled.'
};

function getContext() {
    const ctx = {};
    Array.from(contextForm.elements).forEach(el => {
        if (el.type === 'checkbox') ctx[el.name] = el.checked;
    });
    return ctx;
}

function updateUI() {
    const ctx = getContext();
    // Update user state panel
    userStateList.innerHTML = '';
    Object.keys(ctx).forEach(key => {
        if (ctx[key]) {
            const li = document.createElement('li');
            li.textContent = explanations[key];
            userStateList.appendChild(li);
        }
    });
    if (Object.values(ctx).every(v => !v)) {
        const li = document.createElement('li');
        li.textContent = 'Default state: No special context.';
        userStateList.appendChild(li);
    }

    // Adapt UI
    xrInterface.className = 'xr-default';
    let log = [];
    let explanation = [];
    // Theme adaptation
    if (ctx.bright) {
        xrInterface.classList.add('xr-bright');
        log.push('High-contrast theme enabled.');
        explanation.push(explanations.bright);
    }
    if (ctx.dim) {
        xrInterface.classList.add('xr-dim');
        log.push('Dark mode enabled.');
        explanation.push(explanations.dim);
    }
    // Notification
    if (ctx.distracted) {
        notification.classList.remove('hidden');
        log.push('Notification shown for user distraction.');
        explanation.push(explanations.distracted);
    } else {
        notification.classList.add('hidden');
    }
    // Button size
    if (ctx.handsBusy) {
        mainAction.style.fontSize = '1.5rem';
        mainAction.style.padding = '1.2rem 2.5rem';
        log.push('Buttons enlarged for hands-busy context.');
        explanation.push(explanations.handsBusy);
    } else {
        mainAction.style.fontSize = accessibilityMode ? '1.5rem' : '1.1rem';
        mainAction.style.padding = accessibilityMode ? '1.2rem 2.5rem' : '0.7rem 1.5rem';
    }
    // Slider adaptation
    if (ctx.lowBattery) {
        slider.disabled = true;
        statusIndicator.textContent = 'Status: Low Battery';
        log.push('Slider disabled due to low battery.');
        explanation.push(explanations.lowBattery);
    } else {
        slider.disabled = false;
        statusIndicator.textContent = 'Status: Normal';
    }
    // Visual cues
    if (ctx.noisy) {
        statusIndicator.style.background = '#ffe066';
        log.push('Visual cues enabled for noisy environment.');
        explanation.push(explanations.noisy);
    } else {
        statusIndicator.style.background = '';
    }
    // Accessibility mode
    if (accessibilityMode) {
        xrInterface.style.fontSize = '1.3rem';
        xrInterface.style.lineHeight = '2';
        xrInterface.style.letterSpacing = '1px';
        log.push('Accessibility mode: larger font, higher contrast.');
        explanation.push('Accessibility mode enabled.');
    } else {
        xrInterface.style.fontSize = '';
        xrInterface.style.lineHeight = '';
        xrInterface.style.letterSpacing = '';
    }
    // Focused context
    if (ctx.focused && !ctx.distracted) {
        log.push('User focused: standard UI.');
        explanation.push(explanations.focused);
    }
    // Log adaptation
    if (JSON.stringify(ctx) !== JSON.stringify(lastState)) {
        const logEntry = document.createElement('li');
        logEntry.textContent = log.length ? log.join(' ') : 'No adaptation needed.';
        adaptationLog.insertBefore(logEntry, adaptationLog.firstChild);
        if (adaptationLog.childNodes.length > 10) adaptationLog.removeChild(adaptationLog.lastChild);
    }
    explanationContent.textContent = explanation.length ? explanation.join(' ') : 'No adaptation needed.';
    lastState = ctx;
}

if (contextForm && xrInterface) {
    contextForm.addEventListener('change', updateUI);
    accessibilityToggle.addEventListener('click', () => {
        accessibilityMode = !accessibilityMode;
        updateUI();
    });
    // Initial render
    updateUI();
}
