document.addEventListener("DOMContentLoaded", function () {
    // 1. Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // 2. Check if the user has purchased the plan
    const hasPurchased = localStorage.getItem("hasPurchasedLeanLight") === "true";

    // 3. Select locked and full content sections
    const lockedContent = document.querySelector(".locked-content");
    const fullContent = document.querySelector(".full-content");

    // 4. Handle content visibility based on purchase status
    if (hasPurchased) {
        if (lockedContent) lockedContent.style.display = "none"; // Hide locked content
        if (fullContent) {
            fullContent.classList.remove("hidden");
            fullContent.style.display = "block"; // Show full content
        }
    } else {
        if (lockedContent) lockedContent.style.display = "block"; // Show locked content
        if (fullContent) {
            fullContent.classList.add("hidden");
            fullContent.style.display = "none"; // Hide full content
        }
    }

    // 5. Handle "Buy Now" button logic
    const buyNowButton = document.querySelector(".buy-now");
    if (buyNowButton) {
        buyNowButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default button behavior

            if (isLoggedIn) {
                // If the user is logged in, simulate purchase
                localStorage.setItem("hasPurchasedLeanLight", "true");
                displayMessage("Purchase successful! Reloading page to unlock content...");
                location.reload(); // Reload the page to update content
            } else {
                // If the user is not logged in, prompt to log in
                const userAction = confirm(
                    "You need to log in or sign up to purchase this plan. Do you want to go to the login page?"
                );
                if (userAction) {
                    // Redirect to the login page
                    window.location.href = "login";
                }
            }
        });
    }

    // Remove duplicate event listener for 'enroll-now'
    const enrollNowButton = document.getElementById('enroll-now');
    if (enrollNowButton) {
        enrollNowButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent navigation

            // Simulate unlocking content
            document.querySelectorAll('.locked-content').forEach(function (element) {
                element.classList.remove('locked-content');
                element.innerHTML = element.innerHTML.replace('🔒', '✅'); // Replace lock icon with checkmark
            });

            // Show a success message
            displayMessage('You have successfully enrolled! Full content is now unlocked.');
        });
    }

    // Ensure payment completion logic is not duplicated
    const paymentCompleted = sessionStorage.getItem('paymentCompleted');
    if (paymentCompleted === 'true') {
        // Unlock the content
        document.querySelectorAll('.locked-content').forEach(function (element) {
            element.classList.remove('locked-content');
            element.innerHTML = element.innerHTML.replace('🔒', '✅'); // Replace lock icon with checkmark
        });

        // Clear the session storage to prevent unlocking on reload
        sessionStorage.removeItem('paymentCompleted');
    }

    // Function to display messages
    function displayMessage(message) {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.style.display = 'block';
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 3000); // Hide message after 3 seconds
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
      const lockedContent = document.getElementById("locked-content");
      const fullContent = document.getElementById("full-content");
      const enrollButton = document.getElementById("enroll-btn");

      // Check if the user has purchased the plan
      const hasPurchased = localStorage.getItem("hasPurchasedLeanLight") === "true";
      const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

      if (hasPurchased) {
        // Show the full content if the user has purchased the plan
        lockedContent.classList.add("hidden");
        fullContent.classList.remove("hidden");
      } else {
        // Show locked content if the plan is not purchased
        lockedContent.classList.remove("hidden");
        fullContent.classList.add("hidden");
      }

      // Handle the "Enroll Now" button click
      enrollButton.addEventListener("click", () => {
        if (isLoggedIn) {
          // Redirect to payment page if logged in
          window.location.href = "payment";
        } else {
          // Redirect to login page if not logged in
          window.location.href = "login.html";
        }
      });
    });
});