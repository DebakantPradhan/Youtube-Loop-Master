document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startLoop");
    const stopButton = document.getElementById("stopLoop");
    const startInput = document.getElementById("startTime");
    const endInput = document.getElementById("endTime");

    // Function to format seconds into a hh:mm:ss string
    function formatTimestamp(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Function to update the start time input with the current timestamp
    function updateStartTimeInput() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getCurrentTimestamp' }, (response) => {
                const formattedTimestamp = formatTimestamp(response.timestamp);
                startInput.value = formattedTimestamp;
            });
        });
    }

    // Add event listener to focus on start time input
    startInput.addEventListener('focus', updateStartTimeInput);

    // Function to convert hh:mm:ss to seconds
    function convertToSeconds(timeString) {
        const parts = timeString.split(":").map((part) => parseInt(part, 10));
        let seconds = 0;

        if (parts.length === 3) {
            // hh:mm:ss format
            seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        } else if (parts.length === 2) {
            // mm:ss format
            seconds = parts[0] * 60 + parts[1];
        } else if (parts.length === 1) {
            // ss format
            seconds = parts[0];
        }

        return seconds;
    }

    // Function to update input value and maintain hh:mm:ss structure
    function updateTimeInput(inputElement, increment) {
        const timeParts = inputElement.value
            .split(":")
            .map((part) => parseInt(part, 10));

        // Handle minutes and seconds
        if (timeParts.length === 3) {
            timeParts[2] += increment; // Modify seconds
            if (timeParts[2] >= 60) {
                timeParts[2] = 0;
                timeParts[1] += 1; // Increase minutes if seconds overflow
            } else if (timeParts[2] < 0) {
                timeParts[2] = 59;
                timeParts[1] -= 1; // Decrease minutes if seconds underflow
            }
            if (timeParts[1] >= 60) {
                timeParts[1] = 0;
                timeParts[0] += 1; // Increase hours if minutes overflow
            } else if (timeParts[1] < 0) {
                timeParts[1] = 59;
                timeParts[0] -= 1; // Decrease hours if minutes underflow
            }
            if (timeParts[0] < 0) timeParts[0] = 0; // Prevent negative hours
        } else if (timeParts.length === 2) {
            timeParts[1] += increment; // Modify seconds
            if (timeParts[1] >= 60) {
                timeParts[1] = 0;
            } else if (timeParts[1] < 0) {
                timeParts[1] = 59;
            }
        } else {
            timeParts[0] += increment; // Modify seconds
            if (timeParts[0] >= 60) {
                timeParts[0] = 0;
            } else if (timeParts[0] < 0) {
                timeParts[0] = 59;
            }
        }

        // Update input value maintaining the hh:mm:ss format
        inputElement.value = timeParts
            .map((part) => String(part).padStart(2, "0"))
            .join(":");
    }

    // Handle keyboard input (up/down arrow keys)
    function handleKeydown(event, inputElement) {
        if (event.key === "ArrowUp") {
            updateTimeInput(inputElement, 1); // Scroll up, increase time by 1 second
        } else if (event.key === "ArrowDown") {
            updateTimeInput(inputElement, -1); // Scroll down, decrease time by 1 second
        }
    }

    // Handle mouse scroll input
    function handleMouseScroll(event, inputElement) {
        let increment = event.deltaY > 0 ? 1 : -1; // Scroll down decreases, scroll up increases
        updateTimeInput(inputElement, increment);
    }

    // Add event listeners for arrow keys
    startInput.addEventListener("keydown", (e) => handleKeydown(e, startInput));
    endInput.addEventListener("keydown", (e) => handleKeydown(e, endInput));

    // Add event listeners for mouse scroll
    startInput.addEventListener("wheel", (e) =>
        handleMouseScroll(e, startInput)
    );
    endInput.addEventListener("wheel", (e) => handleMouseScroll(e, endInput));

    // Start Loop button click event
    startButton.addEventListener("click", () => {
        const startTime = startInput.value;
        const endTime = endInput.value;

        // Convert time to seconds
        const startSeconds = convertToSeconds(startTime);
        const endSeconds = convertToSeconds(endTime);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "startLoop",
                startTime: startSeconds,
                endTime: endSeconds,
            });
        });
    });

    // Stop Loop button click event
    stopButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "stopLoop",
            });
        });
    });
});
