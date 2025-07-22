// Simple demo: Change XR interface style based on context selection
const contextSelect = document.getElementById('context-select');
const xrInterface = document.getElementById('xr-interface');

if (contextSelect && xrInterface) {
    contextSelect.addEventListener('change', (e) => {
        xrInterface.className = '';
        switch (e.target.value) {
            case 'bright':
                xrInterface.classList.add('xr-bright');
                break;
            case 'dim':
                xrInterface.classList.add('xr-dim');
                break;
            case 'distracted':
                xrInterface.classList.add('xr-distracted');
                break;
            case 'focused':
                xrInterface.classList.add('xr-focused');
                break;
            default:
                xrInterface.classList.add('xr-default');
        }
    });
}
