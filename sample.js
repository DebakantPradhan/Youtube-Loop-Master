// Function to loop current YouTube video between specified times
function loopCurrentSong(startTime, endTime) {
    // Get the YouTube player element
    const player = document.querySelector('#movie_player');
    
    if (!player) {
        console.error('YouTube player not found. Make sure you are on a YouTube video page.');
        return;
    }

    // Set up interval to check time
    const interval = setInterval(() => {
        try {
            const currentTime = player.getCurrentTime();
            
            // If video passes the end time, jump back to start time
            if (currentTime >= endTime) {
                player.seekTo(startTime, true);
            }
            
            // If video somehow gets before start time, jump to start time
            if (currentTime < startTime) {
                player.seekTo(startTime, true);
            }
        } catch (error) {
            console.error('Error during playback:', error);
            clearInterval(interval);
        }
    }, 1000);

    // Return function to stop looping
    return () => clearInterval(interval);
}

// Store the stop function so it can be called later
window.stopLooping = null;

// Function to start looping with error handling
function startLooping(startSeconds, endSeconds) {
    try {
        // Stop any existing loop
        if (window.stopLooping) {
            window.stopLooping();
        }
        
        // Start new loop
        window.stopLooping = loopCurrentSong(startSeconds, endSeconds);
        console.log('Looping started. Type stopLooping() to stop.');
    } catch (error) {
        console.error('Error starting loop:', error);
    }
}