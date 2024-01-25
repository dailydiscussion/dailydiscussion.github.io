
// Add the 'active' class to trigger the animation
document.addEventListener('DOMContentLoaded', function () {
document.querySelector('.animated-element').classList.add('active');
});

// Get the current hour of the day
var currentHour = new Date().getHours();

// Function to determine the appropriate greeting based on the time
function getGreeting() {
var greeting = '';
if (currentHour >= 5 && currentHour < 12) {
greeting = 'Good Morning!';
} else if (currentHour >= 12 && currentHour < 18) {
greeting = 'Good Afternoon!';
} else {
greeting = 'Good Evening!';
}
return greeting;
}

// Display the greeting message
document.getElementById('greeting').textContent = getGreeting();

// Fetch the JSON data from the file using AJAX
fetch('surgery.json')
.then(response => response.json())
.then(jsonData => {
// Find the Quiz entry by ID
var quizEntry1 = jsonData.tests[0].links.find(link => link.id === "Quiz");
var quizEntry2 = jsonData.tests[0].links.find(link => link.id === "Quiz-2");

// Check if both Quiz entries are found
if (quizEntry1 && quizEntry2) {
// Update the HTML content with the Quiz dynamically for Quiz entry
var quizLink1 = document.getElementById("quizLink1");

quizLink1.href = quizEntry1.url;

document.getElementById("topicContainer1").textContent = quizEntry1.text;
document.getElementById("MCQCount1").textContent = quizEntry1.questions;

// Update the HTML content with the Quiz dynamically for Quiz-2 entry
var quizLink2 = document.getElementById("quizLink2");

quizLink2.href = quizEntry2.url;

document.getElementById("topicContainer2").textContent = quizEntry2.text;
document.getElementById("MCQCount2").textContent = quizEntry2.questions;
} else {
console.error('One or both Quiz entries not found in JSON data.');
}
})
.catch(error => console.error('Error fetching JSON:', error));

// Function to calculate total number of questions
function calculateTotalQuestions(testData) {
let totalQuestions = 0;

testData.tests[0].links.forEach(test => {
const numberOfQuestions = parseInt(test.questions, 10);

if (!isNaN(numberOfQuestions)) {
totalQuestions += numberOfQuestions;
} else {
console.error(`Invalid or missing number of questions for test: ${test.text}`);
}
});

return totalQuestions;
}

// Function to calculate total number of tests
function calculateTotalTests(testData) {
return testData.tests[0].links.length;
}

// Function to calculate total number of days
function calculateTotalDays(testData) {
let totalDays = 0;

testData.tests[0].links.forEach(test => {
const numberOfDays = parseInt(test.days, 10);

if (!isNaN(numberOfDays)) {
totalDays += numberOfDays;
} else {
console.error(`Invalid or missing number of days for test: ${test.text}`);
}
});

return totalDays;
}

// Fetch JSON data from surgery.json
fetch('surgery.json')
.then(response => response.json())
.then(data => {
// Update HTML elements with calculated values
document.getElementById('totalQuestions').innerText = calculateTotalQuestions(data);
document.getElementById('totalTests').innerText = calculateTotalTests(data);
document.getElementById('totalDays').innerText = calculateTotalDays(data);
})
.catch(error => console.error('Error fetching JSON:', error));


// Function to dynamically create the table rows
function createTable(data) {
var table = document.getElementById("dynamicTable");

data.tests.forEach(function (test) {
test.links.forEach(function (link) {
var row = table.insertRow();
var cell = row.insertCell();

// Extract values from the JSON
var text = link.text;
var url = link.url;
var questions = link.questions;

// Create the div elements and set their content
var div1 = document.createElement("div");
div1.classList.add("table-flex");

var topicText = document.createElement("div");
topicText.id = "topic-text";
topicText.innerHTML = text;

var questionsDiv = document.createElement("div");
questionsDiv.classList.add("table-questions");
questionsDiv.innerHTML = '(' + questions + ' MCQs)';

topicText.appendChild(questionsDiv);

var div2 = document.createElement("div");

var linkButton = document.createElement("a");
linkButton.id = "topic-link";
linkButton.href = url;

var button = document.createElement("button");
button.innerHTML = "Review";
button.classList.add("table-button");

// Append the elements to the document
linkButton.appendChild(button);
div2.appendChild(linkButton);

div1.appendChild(topicText);
div1.appendChild(div2);

cell.appendChild(div1);
});
});
}

// Fetch data from surgery.json
fetch('surgery.json')
.then(response => response.json())
.then(data => createTable(data))
.catch(error => console.error('Error fetching data:', error));

