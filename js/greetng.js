// Function to get the greeting message based on the current time
function getGreeting() {
    var currentHour = new Date().getHours();
    var greeting = '';

    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Hi, Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Hi, Good Afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
        greeting = "Hey, It's time to sleep";
    } else {
        greeting = 'Hi, Good Evening';
    }

    return greeting;
}

// Display the greeting message
document.getElementById('greeting').textContent = getGreeting();