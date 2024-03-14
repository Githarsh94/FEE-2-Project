function setLiBackgroundColor(parentSelector, liSelector) {
    const parentElement = document.querySelector(parentSelector);

    if (!parentElement) {
        console.error('Parent element not found');
        return;
    }

    const parentBGColor = getComputedStyle(parentElement).backgroundColor;
    const rgbValues = parentBGColor.match(/\d+/g);

    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    const newR = r + 20 > 255 ? 255 : r + 20;
    const newG = g + 20 > 255 ? 255 : g + 20;
    const newB = b + 20 > 255 ? 255 : b + 20;

    const liElements = document.querySelectorAll(liSelector);
    liElements.forEach((li) => {
        li.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setLiBackgroundColor('main', '.filter-icons li');
    setLiBackgroundColor('main', '.playlist-card');
    setLiBackgroundColor('main', '.header-wrap');
    document.querySelector('.playbar').addEventListener('mouseover', () => {
        document.querySelector('*').style.overflowY = 'hidden';
    })
    document.querySelector('.playbar').addEventListener('mouseout', () => {
        document.querySelector('*').style.overflowY = 'auto';
    })
});
