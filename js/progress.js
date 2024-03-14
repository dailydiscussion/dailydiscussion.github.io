fetchFilePaths().then(paths => {
if (paths && paths.todayquiz) {
// Fetch data from the todayquiz file path
fetch(paths.todayquiz)
.then(response => response.json())
.then(data => {
const totalTests = data.tests[0].totalTests;
const completedTests = calculateCompletedTests(data); // Calculate completedTests
const progress = completedTests / totalTests; // Calculate progress

// Extract subject name from the JSON data
const subjectName = data.tests[0]
.title; // Assuming there's only one subject in the JSON

// Update HTML elements with fetched data
document.getElementById('subject').innerText = `${subjectName}`;
document.getElementById('progressDetails').innerText =
`${completedTests}/${totalTests}`;

// Update progress circle with calculated percentage
updateProgress(progress);
})
.catch(error => console.error('Error fetching data:', error));
}
});

// Function to calculate completed number of tests
function calculateCompletedTests(testData) {
return testData.tests.reduce((total, currentTest) => {
return total + currentTest.links.length;
}, 0);
}

// Function to update progress circle
function updateProgress(progress) {
// Define the parameters for the progress circle
const radius = 50;
const circumference = 2 * Math.PI * radius;

// Calculate the progress length
const progressLength = circumference * progress;

// Calculate the stroke-dasharray and stroke-dashoffset
const dashArray = `${circumference} ${circumference}`;
const dashOffset = circumference - progressLength;

// Get the element to append the SVG to
const progressCircle = document.getElementById('progressCircle');

// Clear previous SVG elements
progressCircle.innerHTML = '';

// Create the SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute('width', '120');
svg.setAttribute('height', '120');

// Create the background circle
const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
bgCircle.setAttribute('cx', '60');
bgCircle.setAttribute('cy', '60');
bgCircle.setAttribute('r', '50');
bgCircle.setAttribute('stroke', 'white');
bgCircle.setAttribute('stroke-width', '10');
bgCircle.setAttribute('fill', 'none');

// Append the background circle to the SVG
svg.appendChild(bgCircle);

// Create the progress arc
const progressArc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
progressArc.setAttribute('cx', '60');
progressArc.setAttribute('cy', '60');
progressArc.setAttribute('r', '50');
progressArc.setAttribute('stroke', '#4caf50');
progressArc.setAttribute('stroke-width', '10');
progressArc.setAttribute('fill', 'none');
progressArc.setAttribute('stroke-dasharray', dashArray);
progressArc.setAttribute('stroke-dashoffset', dashOffset);
progressArc.setAttribute('transform', 'rotate(-90 60 60)'); // Rotate anticlockwise from 12 o'clock position
progressArc.setAttribute('stroke-linecap', 'round'); // Rounded edges

// Append the progress arc to the SVG
svg.appendChild(progressArc);

// Create the text element for percentage
const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
text.setAttribute('x', '50%');
text.setAttribute('y', '50%');
text.setAttribute('text-anchor', 'middle');
text.setAttribute('dominant-baseline', 'middle');
text.setAttribute('font-size', '20px');
text.setAttribute('fill', '#4caf50');
text.textContent = `${Math.round(progress * 100)}%`; // Display the percentage

// Append the text to the SVG
svg.appendChild(text);

// Append the SVG to the progress circle element
progressCircle.appendChild(svg);
}