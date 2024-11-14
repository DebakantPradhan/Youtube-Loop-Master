// Function to get the YouTube player
function getYouTubePlayer() {
    // Try different methods to get the player
    if (document.getElementById("movie_player")) {
        return document.getElementById("movie_player");
    }

    // Alternative method using the video element
    const videoElement = document.querySelector("video.html5-main-video");
    if (videoElement) {
        return videoElement.closest(".html5-video-player");
    }

    // If we still can't find the player, throw an error
    throw new Error("YouTube player not found");
}

// Function to safely get current time
function getCurrentTime() {
    try {
        const player = getYouTubePlayer();
        // Try different methods to get current time
        if (typeof player.getCurrentTime === "function") {
            return player.getCurrentTime();
        }
        if (document.querySelector("video.html5-main-video")) {
            return document.querySelector("video.html5-main-video").currentTime;
        }
        throw new Error("Unable to get current time");
    } catch (error) {
        console.error("Error getting current time:", error);
        return 0;
    }
}

// Function to safely seek to time
function seekTo(time) {
    try {
        const player = getYouTubePlayer();
        if (typeof player.seekTo === "function") {
            player.seekTo(time, true);
        } else if (document.querySelector("video.html5-main-video")) {
            document.querySelector("video.html5-main-video").currentTime = time;
        }
    } catch (error) {
        console.error("Error seeking to time:", error);
    }
}

// Main loop function
function loopCurrentSong(startTime, endTime) {
    console.log(
        "Loop started with start time:",
        startTime,
        "end time:",
        endTime
    );

    // Initial check to make sure we're on a YouTube page
    if (!document.querySelector("video.html5-main-video")) {
        console.error("No YouTube video found on this page");
        return;
    }

    // Set up interval to check time and perform looping
    const interval = setInterval(() => {
        try {
            const currentTime = getCurrentTime();
            console.log("Current time:", currentTime);

            // If video passes the end time, jump back to start time
            if (currentTime >= endTime) {
                seekTo(startTime);
            }

            // If video somehow gets before start time, jump to start time
            if (currentTime < startTime) {
                seekTo(startTime);
            }
        } catch (error) {
            console.error("Error during playback:", error);
            clearInterval(interval);
        }
    }, 500);

    // Return function to stop looping
    return () => clearInterval(interval);
}

// Store the stop function so it can be called later
let stopLooping = null;

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startLoop") {
        // Stop any existing loop if there is one
        if (stopLooping) {
            stopLooping();
        }

        try {
            // Start a new loop
            stopLooping = loopCurrentSong(request.startTime, request.endTime);
            console.log(
                "Looping started from",
                request.startTime,
                "to",
                request.endTime
            );
        } catch (error) {
            console.error("Failed to start loop:", error);
        }
    } else if (request.action === "stopLoop") {
        // Stop the looping if it's running
        if (stopLooping) {
            stopLooping();
            stopLooping = null;
            console.log("Looping stopped");
        }
    }
});
