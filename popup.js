document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startLoop');
    const stopButton = document.getElementById('stopLoop');

    startButton.addEventListener('click', () => {
        const startTime = parseFloat(document.getElementById('startTime').value);
        const endTime = parseFloat(document.getElementById('endTime').value);
        
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'startLoop',
                startTime: startTime,
                endTime: endTime
            });
        });
    });

    stopButton.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'stopLoop'
            });
        });
    });
});