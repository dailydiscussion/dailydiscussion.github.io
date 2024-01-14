// This script will refresh the page only once on load
if (!sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true');
    window.onload = function() {
    location.reload(true);
    };
    }

// Fetch JSON data
fetch('data.json')
.then(response => response.json())
.then(data => {
  // Get the table body element
  const tableBody = document.getElementById('table-body');

  // Iterate through the JSON data and dynamically populate the table
  data.data.forEach((item, index) => {
    const row = tableBody.insertRow();
    const cellName = row.insertCell(0);
    const cellOverallScore = row.insertCell(1);

    cellName.textContent = item.Name;

    // Calculate average score and display in the "Overall Score" column
    const scores = item.Scores.map(score => parseInt(score));
    const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    cellOverallScore.textContent = overallScore.toFixed(2) + "%";

  });
})
.catch(error => console.error('Error fetching JSON:', error));

// JavaScript to update the counter value
const counterElement = document.getElementById('counter');
const targetNumber = 150;
let currentNumber = 0;

function updateCounter() {
  if (currentNumber < targetNumber) {
    currentNumber++;
    counterElement.textContent = currentNumber;
    requestAnimationFrame(updateCounter);
  }
}

// Start the animation
updateCounter();

// Add the 'active' class to trigger the animation
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.animated-element').classList.add('active');
  });