const programsData = {
    'strength-foundations': {
        title: 'Strength Foundations',
        image: 'strength.jpg',
        difficulty: 'Beginner',
        duration: '2 weeks',
        sessionsPerWeek: '3-4 days/week',
        price: 'Rs. 3000',
        originalPrice: 'Rs. 4000',
        enrolledCount: '1,234',
        level: 'Beginner Friendly',
        description: 'Build a solid foundation with our beginner-friendly strength program. This comprehensive program is designed to help you master proper form, develop core strength, and build lean muscle mass safely and effectively.',
        curriculum: [
            { icon: 'fa-dumbbell', text: 'Proper form and technique fundamentals' },
            { icon: 'fa-chart-line', text: 'Progressive overload principles' },
            { icon: 'fa-heart', text: 'Core strength development' },
            { icon: 'fa-running', text: 'Basic movement patterns' }
        ],
        features: [
            { icon: 'fa-video', text: 'HD Video Tutorials' },
            { icon: 'fa-mobile-alt', text: 'Mobile App Access' },
            { icon: 'fa-users', text: 'Community Support' },
            { icon: 'fa-utensils', text: 'Nutrition Guidelines' }
        ],
        trainer: {
            name: 'Alex Thompson',
            image: 'trainer1.jpg',
            credentials: 'Certified Strength & Conditioning Specialist',
            bio: '10+ years of experience in strength training and athletic development. Helped over 1000+ clients achieve their fitness goals.'
        },
        reviews: [
            {
                avatar: 'user1.jpg',
                name: 'Sarah M.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Amazing program! Saw significant improvements in my strength within just 4 weeks.'
            },
            {
                avatar: 'user2.jpg',
                name: 'John D.',
                rating: 5,
                date: '1 month ago',
                text: 'Perfect for beginners. The trainer explains everything clearly and provides great modifications.'
            }
        ]
    },

    'hiit-revolution': {
        title: 'HIIT Revolution',
        image: 'HIIT.jpeg',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        sessionsPerWeek: '4-5 days/week',
        price: 'Rs. 2000',
        originalPrice: 'Rs. 3000',
        enrolledCount: '2,156',
        level: 'Intermediate',
        description: 'Transform your body with our high-intensity interval training program. Designed for those who want to maximize fat burn and improve cardiovascular fitness through efficient, intense workouts.',
        curriculum: [
            { icon: 'fa-bolt', text: 'HIIT fundamentals and technique' },
            { icon: 'fa-heartbeat', text: 'Cardiovascular conditioning' },
            { icon: 'fa-fire', text: 'Fat burning protocols' },
            { icon: 'fa-clock', text: 'Time-efficient workouts' }
        ],
        features: [
            { icon: 'fa-stopwatch', text: '30-minute Workouts' },
            { icon: 'fa-home', text: 'Minimal Equipment Needed' },
            { icon: 'fa-apple-alt', text: 'Nutrition Plan Included' },
            { icon: 'fa-chart-line', text: 'Progress Tracking' }
        ],
        trainer: {
            name: 'Maria Rodriguez',
            image: 'trainer2.jpg',
            credentials: 'HIIT Specialist, Certified Personal Trainer',
            bio: 'Specialized in HIIT and metabolic training with 8 years of experience. Known for creating challenging yet achievable workout programs.'
        },
        reviews: [
            {
                avatar: 'user3.jpg',
                name: 'Mike R.',
                rating: 5,
                date: '1 week ago',
                text: 'Incredible results in just 6 weeks. Lost 8kg and gained significant endurance.'
            },
            {
                avatar: 'user4.jpg',
                name: 'Emma S.',
                rating: 4,
                date: '3 weeks ago',
                text: 'Challenging but very effective program. Great support from the trainer.'
            }
        ]
    },

    'elite-performance': {
        title: 'Elite Performance',
        image: 'adv.jpg',
        difficulty: 'Advanced',
        duration: '2 weeks',
        sessionsPerWeek: '5-6 days/week',
        price: 'Rs. 4000',
        originalPrice: 'Rs. 4500',
        enrolledCount: '847',
        level: 'Advanced',
        description: 'An advanced program designed for experienced athletes looking to push their limits and achieve peak performance. Includes specialized training protocols and performance optimization techniques.',
        curriculum: [
            { icon: 'fa-trophy', text: 'Advanced training methodology' },
            { icon: 'fa-running', text: 'Sport-specific conditioning' },
            { icon: 'fa-chart-bar', text: 'Performance metrics tracking' },
            { icon: 'fa-sync', text: 'Recovery optimization' }
        ],
        features: [
            { icon: 'fa-user-shield', text: 'Personalized Training' },
            { icon: 'fa-clipboard-check', text: 'Weekly Assessments' },
            { icon: 'fa-pills', text: 'Supplement Guidance' },
            { icon: 'fa-bed', text: 'Recovery Protocols' }
        ],
        trainer: {
            name: 'Chris Parker',
            image: 'trainer3.jpg',
            credentials: 'Elite Performance Coach, Sports Scientist',
            bio: '15+ years experience training professional athletes. Former Olympic trainer with expertise in advanced performance optimization.'
        },
        reviews: [
            {
                avatar: 'user5.jpg',
                name: 'David K.',
                rating: 5,
                date: '1 month ago',
                text: 'Next-level program. Helped me break through multiple plateaus and set new PRs.'
            },
            {
                avatar: 'user6.jpg',
                name: 'Lisa M.',
                rating: 5,
                date: '2 months ago',
                text: 'Extremely challenging but incredibly rewarding. The attention to detail is outstanding.'
            }
        ]
    },

    'flex-and-flow': {
        title: 'Flex & Flow',
        image: 'Flexible.jpeg',
        difficulty: 'Beginner',
        duration: '2 weeks',
        sessionsPerWeek: '3 days/week',
        price: 'Rs. 1500',
        originalPrice: 'Rs. 2000',
        enrolledCount: '1,567',
        level: 'Beginner Friendly',
        description: 'Enhance your flexibility, improve mobility, and reduce injury risk with our comprehensive flexibility program. Perfect for beginners and those looking to complement their existing training.',
        curriculum: [
            { icon: 'fa-yoga', text: 'Dynamic stretching routines' },
            { icon: 'fa-child', text: 'Mobility exercises' },
            { icon: 'fa-bone', text: 'Joint health practices' },
            { icon: 'fa-balance-scale', text: 'Balance training' }
        ],
        features: [
            { icon: 'fa-clock', text: 'Short Daily Sessions' },
            { icon: 'fa-home', text: 'No Equipment Needed' },
            { icon: 'fa-video', text: 'Follow-Along Videos' },
            { icon: 'fa-calendar', text: 'Progressive Program' }
        ],
        trainer: {
            name: 'Sophie Chen',
            image: 'trainer4.jpg',
            credentials: 'Yoga Instructor, Mobility Specialist',
            bio: 'Specialized in flexibility and mobility training with 6 years of experience. Focuses on safe, effective stretching techniques.'
        },
        reviews: [
            {
                avatar: 'user7.jpg',
                name: 'Tom H.',
                rating: 5,
                date: '3 weeks ago',
                text: 'Finally touching my toes! Great program for improving flexibility.'
            },
            {
                avatar: 'user8.jpg',
                name: 'Anna P.',
                rating: 5,
                date: '1 month ago',
                text: 'Noticed significant improvement in my mobility. The instructor is excellent.'
            }
        ]
    },

    'cardio-conditioning': {
        title: 'Cardio Conditioning',
        image: 'cardio.jpg',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        sessionsPerWeek: '4 days/week',
        price: 'Rs. 3000',
        originalPrice: 'Rs. 4000',
        enrolledCount: '1,890',
        level: 'Intermediate',
        description: 'Take your cardiovascular fitness to the next level with our structured cardio program. Includes varied workouts to improve endurance, speed, and overall cardiovascular health.',
        curriculum: [
            { icon: 'fa-heartbeat', text: 'Heart rate training zones' },
            { icon: 'fa-running', text: 'Endurance building' },
            { icon: 'fa-tachometer-alt', text: 'Speed development' },
            { icon: 'fa-chart-line', text: 'Progressive overload' }
        ],
        features: [
            { icon: 'fa-heart', text: 'Heart Rate Monitoring' },
            { icon: 'fa-map-marked', text: 'Outdoor & Indoor Options' },
            { icon: 'fa-mobile-alt', text: 'App Integration' },
            { icon: 'fa-chart-bar', text: 'Performance Tracking' }
        ],
        trainer: {
            name: 'James Wilson',
            image: 'trainer5.jpg',
            credentials: 'Endurance Coach, Marathon Runner',
            bio: '12+ years experience in endurance training. Completed multiple marathons and trained hundreds of runners.'
        },
        reviews: [
            {
                avatar: 'user9.jpg',
                name: 'Rachel K.',
                rating: 5,
                date: '2 weeks ago',
                text: 'Fantastic program! Improved my 5k time significantly.'
            },
            {
                avatar: 'user10.jpg',
                name: 'Peter M.',
                rating: 4,
                date: '1 month ago',
                text: 'Great variety of workouts. Never gets boring!'
            }
        ]
    },

    'cross-training-elite': {
        title: 'Cross Training Elite',
        image: 'cross-training.jpg',
        difficulty: 'Advanced',
        duration: '2 weeks',
        sessionsPerWeek: '5 days/week',
        price: 'Rs. 3500',
        originalPrice: 'Rs. 4000',
        enrolledCount: '956',
        level: 'Advanced',
        description: 'A comprehensive cross-training program designed for advanced athletes. Combines strength, endurance, and skill work to develop all-round fitness and athletic performance.',
        curriculum: [
            { icon: 'fa-dumbbell', text: 'Strength & power development' },
            { icon: 'fa-running', text: 'Endurance training' },
            { icon: 'fa-bullseye', text: 'Skill acquisition' },
            { icon: 'fa-medal', text: 'Competition preparation' }
        ],
        features: [
            { icon: 'fa-calendar-alt', text: 'Periodized Training' },
            { icon: 'fa-clipboard-list', text: 'Detailed Workouts' },
            { icon: 'fa-video', text: 'Technique Videos' },
            { icon: 'fa-users', text: 'Community Challenges' }
        ],
        trainer: {
            name: 'Marcus Brown',
            image: 'trainer6.jpg',
            credentials: 'CrossFit Level 3 Trainer, Strength Coach',
            bio: 'Former competitive athlete with 10+ years of coaching experience. Specializes in developing well-rounded athletes.'
        },
        reviews: [
            {
                avatar: 'user11.jpg',
                name: 'Steve R.',
                rating: 5,
                date: '1 week ago',
                text: 'Most comprehensive program I\'ve ever done. Seeing gains in all areas.'
            },
            {
                avatar: 'user12.jpg',
                name: 'Julia F.',
                rating: 5,
                date: '3 weeks ago',
                text: 'Challenging but extremely rewarding. Great community support.'
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Get program ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('id');

    // Get program data
    const program = programsData[programId];

    if (!program) {
        document.body.innerHTML = '<h1>Program not found</h1>';
        return;
    }

    // Update page content
    document.getElementById('program-image').src = program.image;
    document.getElementById('program-title').textContent = program.title;
    document.getElementById('program-duration').textContent = program.duration;
    document.getElementById('program-sessions').textContent = program.sessionsPerWeek;
    document.getElementById('program-price').textContent = program.price;
    document.getElementById('original-price').textContent = program.originalPrice;
    document.getElementById('original-price').textContent = program.originalPrice;
    document.getElementById('program-difficulty').textContent = program.difficulty;
    document.getElementById('program-level').textContent = program.level;
    document.getElementById('enrolled-count').textContent = program.enrolledCount;
    document.getElementById('program-description').textContent = program.description;

    // Populate features
    const featuresList = document.getElementById('features-list');
    program.features.forEach(feature => {
        const div = document.createElement('div');
        div.className = 'feature-item';
        div.innerHTML = `<i class="fas ${feature.icon}"></i> ${feature.text}`;
        featuresList.appendChild(div);
    });

    // Populate curriculum
    const curriculumList = document.getElementById('curriculum-list');
    program.curriculum.forEach(item => {
        const div = document.createElement('div');
        div.className = 'curriculum-item';
        div.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
        curriculumList.appendChild(div);
    });

    // Update trainer information
    document.getElementById('trainer-image').src = program.trainer.image;
    document.getElementById('trainer-name').textContent = program.trainer.name;
    document.getElementById('trainer-credentials').textContent = program.trainer.credentials;
    document.getElementById('trainer-bio').textContent = program.trainer.bio;

    // Populate reviews
    const reviewsList = document.getElementById('reviews-list');
    program.reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `
            <div class="review-header">
                <img src="${review.avatar}" class="reviewer-avatar" alt="${review.name}">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <div class="review-meta">
                        <div class="stars">${'★'.repeat(review.rating)}</div>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        reviewsList.appendChild(div);
    });

    // Update average rating
    const avgRating = program.reviews.reduce((acc, rev) => acc + rev.rating, 0) / program.reviews.length;
    document.getElementById('average-rating').textContent = avgRating.toFixed(1);
    document.getElementById('total-reviews').textContent = `${program.reviews.length} reviews`;
});