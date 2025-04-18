  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Week navigation functionality
    const weekButtons = document.querySelectorAll('.week-nav-btn');
    const weekSections = document.querySelectorAll('.week-section');
    
    // Set up week navigation
    weekButtons.forEach(button => {
        button.addEventListener('click', function() {
            const weekNumber = this.getAttribute('data-week');
            
            // Update active button state
            weekButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected week, hide others
            weekSections.forEach(section => {
                if (section.id === `week${weekNumber}`) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Scroll to the week section
            document.getElementById(`week${weekNumber}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Initially, show only Week 1 and hide others
    weekSections.forEach(section => {
        if (section.id !== 'week1') {
            section.style.display = 'none';
        }
    });
    
    // Progress calculation and update
    updateProgress();
    
    // Logout button event listener
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show confirmation dialog
            if (confirm('Are you sure you want to log out?')) {
                // Here you would typically clear auth tokens/cookies
                // For now, just redirect to the login page
                window.location.href = 'login.html';
            }
        });
    }
});

// Update the progress bar
function updateProgress() {
    // Get the current progress from completed workouts
    const totalWorkouts = document.querySelectorAll('.workout-card').length - 
                         document.querySelectorAll('.rest-day-card').length;
    const completedWorkouts = document.querySelectorAll('.completed-badge').length;
    
    // Update the progress bar width
    const progressPercent = (completedWorkouts / totalWorkouts) * 100;
    document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
    
    // Update the progress stats text
    document.querySelector('.progress-stats').textContent = 
        `${completedWorkouts} of ${totalWorkouts} workouts completed`;
}

// Function to mark a workout as completed
// This would typically be called after a user completes a video
function markWorkoutCompleted(workoutId) {
    // This is a placeholder - in a real app, you would:
    // 1. Update the server via API call
    // 2. Add the completed badge to the workout card
    // 3. Update the progress bar
    
    // For demo purposes, you could add a completed badge dynamically:
    const workoutCard = document.getElementById(workoutId);
    if (workoutCard && !workoutCard.querySelector('.completed-badge')) {
        const thumbnail = workoutCard.querySelector('.workout-thumbnail');
        const badge = document.createElement('div');
        badge.className = 'completed-badge';
        badge.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
        thumbnail.appendChild(badge);
        
        // Update progress
        updateProgress();
    }
}

// Video player page functionality - this would be needed in workout-player.html
function initVideoPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    
    // Extract video ID from YouTube URL
    const videoId = extractYoutubeId(videoUrl);
    
    // Create YouTube player
    if (videoId) {
        const playerDiv = document.getElementById('youtube-player');
        if (playerDiv) {
            new YT.Player(playerDiv, {
                height: '360',
                width: '640',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    'rel': 0
                }
            });

            // Set up completion button
            const completeButton = document.getElementById('mark-complete-btn');
            if (completeButton) {
                completeButton.addEventListener('click', function() {
                    // Send completion status to server
                    fetch('/api/complete-workout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            videoId: videoId,
                            programId: 'strength-foundations'
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert('Workout completed successfully!');
                        window.location.href = 'workout-videos.html';
                    })
                    .catch(error => {
                        console.error('Error marking workout as complete:', error);
                        alert('Failed to mark workout as complete. Please try again.');
                    });
                });
            }
        }
    }
}

function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}