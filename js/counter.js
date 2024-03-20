// Function to update the countdown
function updateCountdown(targetDate, outputElementId) {
const currentDate = new Date();
const timeDifference = targetDate - currentDate;

if (timeDifference > 0) {
const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

// Update the content of the HTML element with the countdown
document.getElementById(outputElementId).innerHTML = `${days} days remaining until exam.`;
} else {
document.getElementById(outputElementId).innerHTML = "The specified date has passed.";
}
}

// Set the target date for the first countdown
const targetDate1 = new Date("2024-05-19T00:00:00");
setInterval(() => updateCountdown(targetDate1, "countdownOutput1"), 1000);

// Set the target date for the second countdown
const targetDate2 = new Date("2024-06-23T00:00:00");
setInterval(() => updateCountdown(targetDate2, "countdownOutput2"), 1000);