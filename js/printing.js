const floorButtons = document.querySelectorAll('[data-floor]');
const floorPanels = document.querySelectorAll('[data-floor-panel]');
const printerLoginLink = document.querySelector('[data-printer-login]');
const printerFloorLabel = document.querySelector('[data-printer-floor-label]');

const printerLinks = {
    first: 'http://35.9.131.150:8000/',
    second: 'http://35.9.135.85:8000/'
};

function selectFloor(floor) {
    floorButtons.forEach((button) => {
        const isSelected = button.dataset.floor === floor;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });

    floorPanels.forEach((panel) => {
        panel.hidden = panel.dataset.floorPanel !== floor;
    });

    const floorName = floor === 'first' ? 'First Floor' : 'Second Floor';
    printerFloorLabel.textContent = floorName;
    printerLoginLink.href = printerLinks[floor];
    printerLoginLink.textContent = `Open ${floorName} printer login`;
}

floorButtons.forEach((button) => {
    button.addEventListener('click', () => selectFloor(button.dataset.floor));
});

selectFloor('first');