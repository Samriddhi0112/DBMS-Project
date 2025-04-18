const availablePrograms = {
    'strength-foundations': {
        title: 'Strength Foundations',
        image: 'strength.jpg',
        difficulty: 'beginner',
        goals: ['strength', 'muscle'],
        preferences: ['weights', 'bodyweight'],
        timeCommitment: {
            daysPerWeek: '3-4',
            sessionLength: '30-60'
        }
    },
    'hiit-revolution': {
        title: 'HIIT Revolution',
        image: 'HIIT.jpeg',
        difficulty: 'intermediate',
        goals: ['weight-loss', 'endurance'],
        preferences: ['hiit', 'cardio'],
        timeCommitment: {
            daysPerWeek: '4-5',
            sessionLength: '30-60'
        }
    },
    'elite-performance': {
        title: 'Elite Performance',
        image: 'adv.jpg',
        difficulty: 'advanced',
        goals: ['strength', 'muscle', 'endurance'],
        preferences: ['weights', 'hiit', 'sports'],
        timeCommitment: {
            daysPerWeek: '5-6',
            sessionLength: '60+'
        }
    },
    'flex-and-flow': {
        title: 'Flex & Flow',
        image: 'Flexible.jpeg',
        difficulty: 'beginner',
        goals: ['flexibility', 'health'],
        preferences: ['yoga', 'bodyweight'],
        timeCommitment: {
            daysPerWeek: '3',
            sessionLength: '30-60'
        }
    },
    'cardio-conditioning': {
        title: 'Cardio Conditioning',
        image: 'cardio.jpg',
        difficulty: 'intermediate',
        goals: ['endurance', 'weight-loss'],
        preferences: ['cardio', 'hiit'],
        timeCommitment: {
            daysPerWeek: '4',
            sessionLength: '30-60'
        }
    },
    'cross-training-elite': {
        title: 'Cross Training Elite',
        image: 'cross-training.jpg',
        difficulty: 'advanced',
        goals: ['strength', 'endurance', 'muscle'],
        preferences: ['weights', 'hiit', 'cardio'],
        timeCommitment: {
            daysPerWeek: '5',
            sessionLength: '60+'
        }
    }
};

// Global variables
let userResponses = {
    goals: [],
    experience: '',
    days: '',
    minutes: '',
    preferences: [],
    age: '',
    gender: '',
    height: '',
    weight: '',
    restrictions: '',
    email: ''
};

// Progress bar functionality
function updateProgressBar(step) {
    const progressBar = document.getElementById('assessment-progress-bar');
    const percent = (step / 5) * 100;
    progressBar.style.width = `${percent}%`;

    // Update step indicators
    document.querySelectorAll('.step').forEach((stepEl) => {
        const stepNum = parseInt(stepEl.getAttribute('data-step'));
        if (stepNum <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

// Navigate to next step
function nextStep(currentStep) {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }

    // Save responses from current step
    saveResponses(currentStep);

    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');

    // Show next step
    document.getElementById(`step-${currentStep + 1}`).classList.add('active');

    // Update progress bar
    updateProgressBar(currentStep + 1);

    // Scroll to top of form
    document.querySelector('.assessment-container').scrollIntoView({ behavior: 'smooth' });
}

// Navigate to previous step
function prevStep(currentStep) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');

    // Show previous step
    document.getElementById(`step-${currentStep - 1}`).classList.add('active');

    // Update progress bar
    updateProgressBar(currentStep - 1);

    // Scroll to top of form
    document.querySelector('.assessment-container').scrollIntoView({ behavior: 'smooth' });
}

// Validate current step inputs
function validateStep(step) {
    switch(step) {
        case 1:
            // Check if at least one goal is selected
            const goals = document.querySelectorAll('input[name="goals"]:checked');
            if (goals.length === 0) {
                alert('Please select at least one fitness goal.');
                return false;
            }
            return true;
            
        case 2:
            // Check if experience level is selected
            const experience = document.querySelector('input[name="experience"]:checked');
            if (!experience) {
                alert('Please select your experience level.');
                return false;
            }
            return true;
            
        case 3:
            // Check if both days and minutes are selected
            const days = document.querySelector('input[name="days"]:checked');
            const minutes = document.querySelector('input[name="minutes"]:checked');
            if (!days || !minutes) {
                alert('Please select both frequency and duration.');
                return false;
            }
            return true;
            
        case 4:
            // Check if at least one preference is selected
            const preferences = document.querySelectorAll('input[name="preferences"]:checked');
            if (preferences.length === 0) {
                alert('Please select at least one workout style preference.');
                return false;
            }
            return true;
            
        case 5:
            // Check required fields
            const age = document.getElementById('age').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const email = document.getElementById('email').value;
            
            if (!age) {
                alert('Please enter your age.');
                return false;
            }
            
            if (!gender) {
                alert('Please select your gender.');
                return false;
            }
            
            if (!email) {
                alert('Please enter your email address.');
                return false;
            } else if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return false;
            }
            
            return true;
            
        default:
            return true;
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Save responses from current step
function saveResponses(step) {
    switch(step) {
        case 1:
            userResponses.goals = Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(input => input.value);
            break;
            
        case 2:
            userResponses.experience = document.querySelector('input[name="experience"]:checked').value;
            break;
            
        case 3:
            userResponses.days = document.querySelector('input[name="days"]:checked').value;
            userResponses.minutes = document.querySelector('input[name="minutes"]:checked').value;
            break;
            
        case 4:
            userResponses.preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked')).map(input => input.value);
            break;
            
        case 5:
            userResponses.age = document.getElementById('age').value;
            userResponses.gender = document.querySelector('input[name="gender"]:checked').value;
            userResponses.height = document.getElementById('height').value;
            userResponses.weight = document.getElementById('weight').value;
            userResponses.restrictions = document.getElementById('restrictions').value;
            userResponses.email = document.getElementById('email').value;
            break;
    }
}

// Submit assessment and show results
function submitAssessment() {
    // Hide form and show loading
    document.querySelector('.assessment-form .assessment-step.active').classList.remove('active');
    document.getElementById('results').classList.add('active');
    
    // Simulate processing time
    setTimeout(function() {
        // Hide loading spinner
        document.querySelector('.results-loading').style.display = 'none';
        
        // Show results content
        document.querySelector('.results-content').style.display = 'block';
        
        // Generate program recommendations based on user responses
        generateRecommendations();
        
        // Generate fitness insights
        generateInsights();
        
        // Send data to server (in a real implementation)
        // sendDataToServer();
    }, 2500);
}

// Generate program recommendations
function generateRecommendations() {
    const programContainer = document.getElementById('program-recommendations');
    
    // Calculate program matches
    const programMatches = Object.entries(availablePrograms).map(([id, program]) => {
        let score = 0;

        // Match difficulty level
        if (userResponses.experience === 'beginner' && program.difficulty === 'beginner') score += 3;
        if (userResponses.experience === 'intermediate' && program.difficulty === 'intermediate') score += 3;
        if (userResponses.experience === 'advanced' && program.difficulty === 'advanced') score += 3;

        // Match goals
        const goalMatches = userResponses.goals.filter(goal => program.goals.includes(goal));
        score += goalMatches.length * 2;

        // Match preferences
        const prefMatches = userResponses.preferences.filter(pref => program.preferences.includes(pref));
        score += prefMatches.length * 2;

        // Match time commitment
        if (userResponses.days === program.timeCommitment.daysPerWeek) score += 2;
        return {
            id,
            program,
            score,
            matchPercentage: Math.min(Math.round((score / 10) * 100), 100)
        };
    });

    // Sort by match score and get top 3
    const topMatches = programMatches.sort((a, b) => b.score - a.score).slice(0, 3);

    // Generate HTML for program cards
    let programsHTML = '';
    topMatches.forEach(match => {
        const imagePath = `assets/images/programs/${match.program.image}`; // Update this path to match your project structure
        programsHTML += `
            <div class="program-card">
                <div class="program-image">
                    <img src="${imagePath}" 
                         alt="${match.program.title}"
                         onerror="this.src='/assets/images/default-program.jpg';"
                         loading="lazy">
                    <span class="match-badge">${match.matchPercentage}% Match</span>
                </div>
                <div class="program-details">
                    <h4>${match.program.title}</h4>
                    <p><i class="fas fa-signal"></i> Difficulty: ${match.program.difficulty.charAt(0).toUpperCase() + match.program.difficulty.slice(1)}</p>
                    <p><i class="far fa-calendar-alt"></i> ${match.program.timeCommitment.daysPerWeek} days/week</p>
                    <p><i class="far fa-clock"></i> ${match.program.timeCommitment.sessionLength} min/session</p>
                    <a href="program-detail?id=${match.id}" class="view-program-btn">View Program</a>
                </div>
            </div>
        `;
    });

    programContainer.innerHTML = programsHTML;
}

// Generate fitness insights
function generateInsights() {
    const insightsContainer = document.getElementById('fitness-insights');
    
    // Calculate BMI if height and weight are provided
    let bmi = '';
    if (userResponses.height && userResponses.weight) {
        const heightInMeters = userResponses.height / 100;
        const bmiValue = (userResponses.weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        let bmiCategory = '';
        if (bmiValue < 18.5) bmiCategory = 'underweight';
        else if (bmiValue < 25) bmiCategory = 'normal weight';
        else if (bmiValue < 30) bmiCategory = 'overweight';
        else bmiCategory = 'obese';
        
        bmi = `<div class="insight-item">
            <div class="insight-icon"><i class="fas fa-calculator"></i></div>
            <div class="insight-content">
                <h4>BMI (Body Mass Index)</h4>
                <p>Your BMI is <strong>${bmiValue}</strong>, which is considered <strong>${bmiCategory}</strong>.</p>
                <p class="insight-note">BMI is a general indicator and doesn't account for muscle mass or body composition.</p>
            </div>
        </div>`;
    }
    
    // Generate time commitment insight
    let timeCommitment = '';
    if (userResponses.days && userResponses.minutes) {
        const daysRange = userResponses.days;
        const minutesRange = userResponses.minutes;
        
        // Calculate average values from ranges
        const daysAvg = daysRange === '2-3' ? 2.5 : daysRange === '4-5' ? 4.5 : 6.5;
        const minutesAvg = minutesRange === '15-30' ? 22.5 : minutesRange === '30-60' ? 45 : 75;
        
        // Calculate weekly commitment
        const weeklyMinutes = daysAvg * minutesAvg;
        const weeklyHours = (weeklyMinutes / 60).toFixed(1);
        
        timeCommitment = `<div class="insight-item">
            <div class="insight-icon"><i class="far fa-clock"></i></div>
            <div class="insight-content">
                <h4>Weekly Time Commitment</h4>
                <p>Based on your schedule, you'll be working out approximately <strong>${weeklyHours} hours per week</strong>.</p>
                <p class="insight-note">Consistency is more important than duration for long-term success.</p>
            </div>
        </div>`;
    }
    
    // Generate personalized advice based on goals
    let advice = '';
    if (userResponses.goals.length > 0) {
        let adviceText = '';
        
        if (userResponses.goals.includes('weight-loss')) {
            adviceText += 'Focus on creating a calorie deficit through both diet and exercise. Combine cardio with strength training for optimal results. ';
        }
        
        if (userResponses.goals.includes('muscle')) {
            adviceText += 'Prioritize progressive overload in your strength training and ensure adequate protein intake (around 1.6-2.2g per kg of bodyweight). ';
        }
        
        if (userResponses.goals.includes('strength')) {
            adviceText += 'Focus on compound movements and gradually increase weight over time. Rest periods of 2-3 minutes between sets are optimal for strength gains. ';
        }
        
        if (userResponses.goals.includes('endurance')) {
            adviceText += 'Gradually increase duration and intensity of cardio sessions. Mix high-intensity intervals with longer, steady-state workouts. ';
        }
        
        if (userResponses.goals.includes('flexibility')) {
            adviceText += 'Incorporate dedicated stretching sessions after workouts when muscles are warm. Consider yoga or pilates to improve overall mobility. ';
        }
        
        advice = `<div class="insight-item">
            <div class="insight-icon"><i class="fas fa-lightbulb"></i></div>
            <div class="insight-content">
                <h4>Personalized Advice</h4>
                <p>${adviceText}</p>
            </div>
        </div>`;
    }
    
    // Generate age-specific recommendations
    let ageRecommendation = '';
    if (userResponses.age) {
        const age = parseInt(userResponses.age);
        let ageAdvice = '';
        
        if (age < 20) {
            ageAdvice = 'Focus on building good exercise habits and proper form. This is a great time to develop strength, flexibility, and endurance for long-term fitness.';
        } else if (age < 30) {
            ageAdvice = 'This is an optimal time for building strength and muscle. Take advantage of higher recovery capacity while still prioritizing proper form.';
        } else if (age < 40) {
            ageAdvice = 'Balance intensity with recovery. Focus on maintaining muscle mass and joint mobility as natural hormonal changes begin.';
        } else if (age < 50) {
            ageAdvice = 'Prioritize preserving muscle mass with regular strength training. Include more mobility work to maintain joint health.';
        } else if (age < 60) {
            ageAdvice = 'Focus on functional strength, balance, and mobility. Recovery becomes more important - ensure adequate rest between intense sessions.';
        } else {
            ageAdvice = 'Emphasize mobility, balance, and functional fitness. Regular strength training is essential to counter age-related muscle loss.';
        }
        
        ageRecommendation = `<div class="insight-item">
            <div class="insight-icon"><i class="fas fa-user"></i></div>
            <div class="insight-content">
                <h4>Age-Optimized Training</h4>
                <p>${ageAdvice}</p>
            </div>
        </div>`;
    }
    
    // Generate nutrition advice based on goals
    let nutritionAdvice = `<div class="insight-item">
        <div class="insight-icon"><i class="fas fa-apple-alt"></i></div>
        <div class="insight-content">
            <h4>Nutrition Tips</h4>
            <p>`;
            
    if (userResponses.goals.includes('weight-loss')) {
        nutritionAdvice += 'Aim for a moderate calorie deficit of 300-500 calories/day. Focus on protein (helps preserve muscle) and fiber-rich foods for satiety. ';
    } else if (userResponses.goals.includes('muscle')) {
        nutritionAdvice += 'Consume a slight calorie surplus (200-300 calories/day) with emphasis on protein intake. Time your carbohydrates around workouts for energy. ';
    } else {
        nutritionAdvice += 'Focus on balanced nutrition with plenty of whole foods. Stay hydrated and ensure adequate protein intake to support recovery. ';
    }
    
    nutritionAdvice += '</p></div></div>';
    
    // Combine all insights
    insightsContainer.innerHTML = bmi + timeCommitment + advice + ageRecommendation + nutritionAdvice;
}

// Send data to server (would be implemented in a production environment)
function sendDataToServer() {
    
    
    console.log('User responses:', userResponses);
    // For now, just log the data to console
}

// Event listener for document load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bar
    updateProgressBar(1);
    
    // Add event listeners for enter key in form fields
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const currentStep = parseInt(this.closest('.assessment-step').id.split('-')[1]);
                if (this.closest('.assessment-step').id !== 'step-5') {
                    nextStep(currentStep);
                } else {
                    submitAssessment();
                }
            }
        });
    });
});