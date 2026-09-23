const floorButtons = document.querySelectorAll('[data-floor]');
const floorPanels = document.querySelectorAll('[data-floor-panel]');
const printerLoginLink = document.querySelector('[data-printer-login]');
const printerFloorLabel = document.querySelector('[data-printer-floor-label]');
const printTypeButtons = document.querySelectorAll('[data-print-type]');
const printServiceButtons = document.querySelectorAll('[data-print-service]');
const printRoutePanels = document.querySelectorAll('[data-print-route-panel]');
const printServicePicker = document.querySelector('[data-print-service-picker]');
const colorMessage = document.querySelector('[data-color-message]');

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

function selectPrintService(service) {
    printServiceButtons.forEach((button) => {
        const isSelected = button.dataset.printService === service;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });

    printRoutePanels.forEach((panel) => {
        panel.hidden = panel.dataset.printRoutePanel !== service;
    });
}

function selectPrintType(type) {
    printTypeButtons.forEach((button) => {
        const isSelected = button.dataset.printType === type;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });

    const isColor = type === 'color';
    if (printServicePicker) printServicePicker.hidden = isColor;
    if (colorMessage) colorMessage.hidden = !isColor;
    selectPrintService(isColor ? 'decs' : 'cmse');
}

floorButtons.forEach((button) => button.addEventListener('click', () => selectFloor(button.dataset.floor)));
printServiceButtons.forEach((button) => button.addEventListener('click', () => selectPrintService(button.dataset.printService)));
printTypeButtons.forEach((button) => button.addEventListener('click', () => selectPrintType(button.dataset.printType)));

if (floorButtons.length) selectFloor('first');
if (printTypeButtons.length) selectPrintType('black-white');
