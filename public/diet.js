document.addEventListener("DOMContentLoaded", function() {
  // Main elements
  const bmiCalculatorForm = document.getElementById("bmi-calculator")?.querySelector("form");
  const assessmentForm = document.querySelector(".diet-assessment:not(#bmi-calculator) form");
  const guideCards = document.querySelectorAll(".guide-card");
  const tipElements = document.querySelectorAll(".tip");
  const newsletterForm = document.querySelector(".newsletter-form");
  
  // BMI Calculator function that can be called from the HTML button
  window.calculateBMI = function() {
      const weightInput = document.getElementById("weight");
      const heightInput = document.getElementById("height");
      const bmiResultElement = document.getElementById("bmiResult");
      const bmiStatusElement = document.getElementById("bmiStatus");
      
      if(weightInput && heightInput && weightInput.value && heightInput.value) {
          const weight = parseFloat(weightInput.value);
          const height = parseFloat(heightInput.value);
          
          // Convert height from cm to meters
          const heightInMeters = height / 100;
          // Calculate BMI: weight (kg) / height² (m)
          const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
          
          // Display the BMI result
          bmiResultElement.innerHTML = `Your BMI: ${bmi}`;
          
          // Determine health status based on BMI
          let status = "";
          if(bmi < 18.5) {
              status = "Underweight";
          } else if(bmi >= 18.5 && bmi < 25) {
              status = "Normal weight";
          } else if(bmi >= 25 && bmi < 30) {
              status = "Overweight";
          } else {
              status = "Obese";
          }
          
          // Display health status
          bmiStatusElement.innerHTML = `Health status: ${status}`;
          
          // Show a custom message below BMI status
          showCustomMessage(status);
      } else {
          // If inputs are missing
          bmiResultElement.innerHTML = "Please enter both weight and height.";
          bmiStatusElement.innerHTML = "";
      }
  };
  
  // Function to show custom message below BMI status
  function showCustomMessage(status) {
      // Check if message container already exists, if not create it
      let messageContainer = document.querySelector(".bmi-message");
      if (!messageContainer) {
          messageContainer = document.createElement("div");
          messageContainer.className = "message-container bmi-message";
          
          const messageElement = document.createElement("div");
          messageElement.id = "bmiMessage";
          messageContainer.appendChild(messageElement);
          
          // Insert after the BMI status container's parent
          const bmiStatusContainer = document.getElementById("bmiStatus").parentNode;
          bmiStatusContainer.parentNode.insertBefore(messageContainer, bmiStatusContainer.nextSibling);
      }
      
      // Get message element and set content based on status
      const messageBox = document.getElementById("bmiMessage"); // assuming this is your message container
      messageBox.className = ""; // clear previous class

      switch (status) {
        case "Underweight":
          message = "Consider consulting with a nutritionist about healthy weight gain strategies.";
          messageBox.classList.add("bmi-underweight");
          break;
        case "Normal weight":
          message = "Great job! Maintain your healthy habits with our balanced nutrition plans.";
          messageBox.classList.add("bmi-normal");
          break;
        case "Overweight":
          message = "Our weight management plans can help you achieve your ideal weight.";
          messageBox.classList.add("bmi-overweight");
          break;
        case "Obese":
          message = "We recommend our specialized weight loss plans and consulting a healthcare provider.";
          messageBox.classList.add("bmi-obese");
          break;
        default:
          message = "Thank you for using our BMI calculator!";
          messageBox.classList.add("bmi-default");
      }
      messageBox.textContent = message;

      
      messageElement.innerHTML = message;

      messageElement.style.fontWeight = "bold";
      messageElement.style.padding = "10px 0";
  }
  
  // Fix for the ID conflict - prevent form submission on BMI calculator form
  if (bmiCalculatorForm) {
      bmiCalculatorForm.addEventListener("submit", function(e) {
          e.preventDefault(); // Prevent form submission
      });
  }
  
  // Diet Assessment Form Handling
  if (assessmentForm) {
    assessmentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Retrieve user input values
      const formData = {
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        activity: document.getElementById("activity").value,
        goal: document.getElementById("goal").value
      };
      
      // Filter diet plans based on selected goal
      filterDietPlans(formData.goal);
      
      // Store user preferences in localStorage for personalization
      saveUserPreferences(formData);
      
      // Calculate calories if needed
      updateCalorieCalculator(formData);
      
      // Smoothly scroll to the diet plans section
      scrollToElement(".diet-guides");
    });
  }
  
  // Update calorie calculator based on form data
  function updateCalorieCalculator(formData) {
      const calorieValue = document.getElementById("calorieValue");
      if (!calorieValue) return;
      
      // Simple calorie calculation based on gender, weight, height, age, and activity level
      let bmr = 0;
      
      if (formData.gender === "male") {
          // Men: BMR = 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)
          bmr = 88.362 + (13.397 * parseFloat(formData.weight)) + 
                (4.799 * parseFloat(formData.height)) - (5.677 * parseFloat(formData.age));
      } else {
          // Women: BMR = 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)
          bmr = 447.593 + (9.247 * parseFloat(formData.weight)) + 
                (3.098 * parseFloat(formData.height)) - (4.330 * parseFloat(formData.age));
      }
      
      // Apply activity multiplier
      let activityMultiplier = 1.2; // Default sedentary
      if (formData.activity === "moderate") {
          activityMultiplier = 1.55;
      } else if (formData.activity === "active") {
          activityMultiplier = 1.725;
      }
      
      // Calculate total daily calories
      let dailyCalories = Math.round(bmr * activityMultiplier);
      
      // Adjust based on goal
      if (formData.goal === "weight-loss") {
          dailyCalories -= 500; // Deficit for weight loss
      } else if (formData.goal === "muscle-gain") {
          dailyCalories += 300; // Surplus for muscle gain
      }
      
      // Update the display with animation
      animateCalorieCounter(calorieValue, dailyCalories);
  }
  
  // Animate the calorie counter
  function animateCalorieCounter(element, targetValue) {
      const startValue = parseInt(element.textContent) || 0;
      const duration = 1500; // Animation duration in ms
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          if (elapsedTime < duration) {
              const progress = elapsedTime / duration;
              const currentValue = Math.round(startValue + (targetValue - startValue) * progress);
              element.textContent = currentValue;
              requestAnimationFrame(updateCounter);
          } else {
              element.textContent = targetValue;
          }
      }
      
      requestAnimationFrame(updateCounter);
  }
  
  // Filter Diet Plans Function - Consolidated the duplicate function
  function filterDietPlans(goalType) {
    const parentContainer = document.querySelector(".guide-cards"); // Parent container of the cards

    // Convert NodeList to an array for sorting
    const cardsArray = Array.from(guideCards);

    // Filter and sort cards based on the goal type
    const sortedCards = cardsArray.sort((a, b) => {
        const aCategory = a.dataset.category;
        const bCategory = b.dataset.category;

        if (aCategory === goalType) return -1; // Move matching cards to the top
        if (bCategory === goalType) return 1;
        return 0; // Keep other cards in their current order
    });

    // Clear the parent container and re-append sorted cards
    parentContainer.innerHTML = "";
    sortedCards.forEach((card) => {
        if (card.dataset.category === goalType || goalType === "all") {
            card.classList.add("active");
            card.style.visibility = "visible";
            card.style.opacity = "1";
        } else {
            card.classList.remove("active");
            card.style.visibility = "hidden";
            card.style.opacity = "0";
        }
        parentContainer.appendChild(card);
    });
  }
  
  // Save User Preferences to localStorage
  function saveUserPreferences(data) {
    localStorage.setItem("flexFusionUserPrefs", JSON.stringify(data));
  }
  
  // Load User Preferences if available
  function loadUserPreferences() {
    const savedPrefs = localStorage.getItem("flexFusionUserPrefs");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      
      // Pre-fill the form with saved preferences
      Object.keys(prefs).forEach(key => {
        const input = document.getElementById(key);
        if (input) input.value = prefs[key];
      });
      
      // Optional: Add personalized greeting
      addPersonalizedGreeting(prefs);
    }
  }
  
  // Add personalized greeting based on user data
  function addPersonalizedGreeting(prefs) {
    const greetingSection = document.querySelector(".personal-greeting");
    if (greetingSection) {
      const timeOfDay = getTimeOfDay();
      greetingSection.innerHTML = `
        <h3>Good ${timeOfDay}!</h3>
        <p>Welcome to your personalized nutrition journey.</p>
      `;
      greetingSection.style.display = "block";
    }
  }
  
  // Helper function to get time of day for greeting
  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  }
  
  // Smooth scroll function
  function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  }
  
  // Scroll reveal animation
  function initScrollReveal() {
    const revealElements = [...guideCards, ...tipElements];
    
    function checkReveal() {
      const revealPoint = window.innerHeight / 1.3;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < revealPoint) {
          element.classList.add("active");
        }
      });
    }
    
    // Initial check and event listener
    window.addEventListener("scroll", checkReveal);
    checkReveal();
  }
  
  // Initialize the Filter Tabs for diet plans
  function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length > 0) {
      filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs
          filterTabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          filterDietPlans(filter);
        });
      });
    }
  }
  
  // --- Newsletter Form Submission ---
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector("input[type='email']");
      const email = emailInput.value.trim();
      
      if (!validateEmail(email)) {
        showNotification("Please enter a valid email address", "error");
      } else {
        // Typically send the data to your server
        showNotification("Thank you for subscribing to our newsletter!", "success");
        newsletterForm.reset();
      }
    });
  }
  
  // Email validation function
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  // Show notification function (better than alert)
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <p>${message}</p>
        <button class="close-btn">&times;</button>
      </div>
    `;
    
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "15px 20px",
      backgroundColor: type === "success" ? "#4CAF50" : "#f44336",
      color: "white",
      borderRadius: "4px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      zIndex: "9999",
      transition: "all 0.3s ease",
      opacity: "0",
      transform: "translateY(20px)"
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 10);
    
    const closeBtn = notification.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(20px)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(20px)";
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
  
  // Handle testimonial slider
  function initTestimonialSlider() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (dots.length && testimonials.length) {
      // Initially show only the first testimonial
      testimonials[0].style.display = 'flex';
      for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
      }
      
      // Add click event to dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          dots.forEach(d => d.classList.remove('active'));
          dot.classList.add('active');
          
          testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            setTimeout(() => {
              testimonial.style.display = 'none';
            }, 300);
          });
          
          setTimeout(() => {
            testimonials[index].style.display = 'flex';
            setTimeout(() => {
              testimonials[index].style.opacity = '1';
            }, 50);
          }, 350);
        });
      });
    }
  }
  
  // Handle mobile menu
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });
    }
  }
  
  // Initialize all features
  function init() {
    loadUserPreferences();
    initScrollReveal();
    initFilterTabs();
    initTestimonialSlider();
    initMobileMenu();
    
    // Check if initFoodDiary function exists before calling it
    if (typeof initFoodDiary === 'function') {
      initFoodDiary();  // Initialize the integrated food diary module
    }
  }
  
  // Initialize all components
  init();
});

document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const guideCards = document.querySelectorAll(".guide-card");
  const assessmentForm = document.getElementById("assessmentForm");

  // Function to highlight the correct filter button
  function highlightFilterButton(goalType) {
    filterTabs.forEach((tab) => {
      if (tab.dataset.filter === goalType) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // Function to filter diet plans based on the goal
  function filterDietPlans(goalType) {
    guideCards.forEach((card) => {
      if (goalType === "all" || card.dataset.category === goalType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Add click event listeners to filter buttons
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const goalType = tab.dataset.filter;
      highlightFilterButton(goalType);
      filterDietPlans(goalType);
    });
  });

  // Handle form submission
  if (assessmentForm) {
    assessmentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get the selected goal from the form
      const goalType = document.getElementById("goal").value;

      // Scroll to the "Our Diet Plans" section
      const dietPlansSection = document.querySelector(".diet-guides");
      if (dietPlansSection) {
        dietPlansSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Highlight the corresponding filter button and filter plans
      highlightFilterButton(goalType);
      filterDietPlans(goalType);
    });
  }});