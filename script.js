// js for greetings 
function getGreeting() {
var currentHour = new Date().getHours();
var greeting = '';

if (currentHour >= 5 && currentHour < 12) {
greeting = 'Hi, Good Morning 🌞';
} else if (currentHour >= 12 && currentHour < 18) {
greeting = 'Hi, Good Afternoon ☀️';
} else if (currentHour >= 2 && currentHour < 5) {
greeting = "Hey, It's time to sleep 😴";
} else {
greeting = 'Hi, Good Evening 🌙';
}

return greeting;
}

// Display the greeting message
document.getElementById('greeting').textContent = getGreeting();

// Quiz links //

// Fetch the JSON data from the file using AJAX
fetch('data/anesthesia.json')
.then(response => response.json())
.then(jsonData => {
// Find the Quiz entry by ID
var quizEntry1 = jsonData.tests[0].links.find(link => link.id === "Quiz");

// Check if both Quiz entries are found
if (quizEntry1) {
// Update the HTML content with the Quiz dynamically for Quiz entry
var quizLink1 = document.getElementById("quizLink1");

quizLink1.href = quizEntry1.url;

document.getElementById("topicContainer1").textContent = quizEntry1.text;
document.getElementById("MCQCount1").textContent = quizEntry1.questions;
} else {
console.error('Quiz entries not found in JSON data.');
}
})
.catch(error => console.error('Error fetching JSON:', error));

// quiz-2 script 

// Fetch the JSON data from the file using AJAX
fetch('data/anesthesia.json')
.then(response => response.json())
.then(jsonData => {
// Find the Quiz entry by ID
var quizEntry2 = jsonData.tests[0].links.find(link => link.id === "Quiz-2");

// Check if both Quiz entries are found
if (quizEntry2) {
// Update the HTML content with the Quiz dynamically for Quiz-2 entry
var quizLink2 = document.getElementById("quizLink2");

quizLink2.href = quizEntry2.url;

document.getElementById("topicContainer2").textContent = quizEntry2.text;
document.getElementById("MCQCount2").textContent = quizEntry2.questions;
} else {
console.error('Quiz entries not found in JSON data.');
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

// Fetch JSON data from all files in the data folder
const fetchData = async () => {
const files = ['surgery.json', 'obgy.json', 'anatomy.json', 'anesthesia.json', 'biochem.json',
'derma.json', 'ent.json', 'fmt.json', 'medicine.json', 'microbiology.json', 'ortho.json',
'patho.json', 'pedia.json', 'pharma.json', 'physiology.json', 'psm.json', 'psychiatry.json',
'radiology.json'
];
const responses = await Promise.all(files.map(file => fetch(`data/${file}`).then(response =>
response.json())));

return responses;
};

fetchData()
.then(dataArray => {
// Combine data from all JSON files
const combinedData = dataArray.reduce((accumulator, currentData) => {
// Combine logic here based on your data structure
// For simplicity, assuming the structure is similar across files
accumulator.tests[0].links = accumulator.tests[0].links.concat(currentData.tests[0]
.links);
return accumulator;
});

// Update HTML elements with calculated values
document.getElementById('totalQuestions').innerText = calculateTotalQuestions(combinedData);
document.getElementById('totalTests').innerText = calculateTotalTests(combinedData);
document.getElementById('totalDays').innerText = calculateTotalDays(combinedData);
document.getElementById('totalTests-card').innerText = calculateTotalTests(combinedData);
})
.catch(error => console.error('Error fetching JSON:', error));

// Function to update the date dynamically
function updateDate() {
var currentDateElement = document.getElementById('currentDate');
var currentDate = new Date();

// Format the date as needed (e.g., "27 Jan 2024")
var options = {
day: 'numeric',
month: 'short',
year: 'numeric'
};
var formattedDate = currentDate.toLocaleDateString('en-US', options);

// Update the content of the element
currentDateElement.textContent = formattedDate;
}

// Call the function on page load
window.onload = function () {
updateDate();

// Update the date every second (1000 milliseconds)
setInterval(updateDate, 1000);
};


// js for event calender //

document.addEventListener("DOMContentLoaded", function() {
const currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1; // Adjust for zero-based month
let currentYear = currentDate.getFullYear();
let todayDate = currentDate.getDate(); // Get today's date

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentMonthText = document.getElementById("currentMonth");
const daysContainer = document.getElementById("daysContainer");
const eventContainer = document.getElementById("eventContainer");

prevBtn.addEventListener("click", function() {
updateCalendar(-1);
});

nextBtn.addEventListener("click", function() {
updateCalendar(1);
});

function updateCalendar(delta) {
currentMonth += delta;
if (currentMonth < 1) {
currentMonth = 12;
currentYear--;
} else if (currentMonth > 12) {
currentMonth = 1;
currentYear++;
}
renderCalendar();
}

function renderCalendar() {
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

currentMonthText.textContent = monthNames[currentMonth - 1] + ' ' + currentYear;
const fragment = document.createDocumentFragment(); // Create a document fragment

fetch('calendar-event.json')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
const events = data;

const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
const startDayIndex = firstDayOfMonth.getDay();

const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

// Append day names
for (let i = 0; i < 7; i++) {
const dayNameElement = document.createElement('div');
dayNameElement.classList.add('day-name');
dayNameElement.textContent = dayNames[i];
fragment.appendChild(dayNameElement); // Append day name to fragment
}

for (let i = 0; i < startDayIndex; i++) {
const emptyDayElement = document.createElement('div');
emptyDayElement.classList.add('empty-day');
fragment.appendChild(emptyDayElement); // Append empty day to fragment
}

for (let i = 1; i <= daysInMonth; i++) {
const dayElement = document.createElement('div');
dayElement.classList.add('day-app');
dayElement.textContent = i;

if (i === todayDate && currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear()) {
dayElement.classList.add('today');
}

dayElement.addEventListener("click", function() {
const paddedMonth = currentMonth.toString().padStart(2, '0');
const paddedDay = i.toString().padStart(2, '0');
const dateKey = `${currentYear}-${paddedMonth}-${paddedDay}`;
const event = events[dateKey];
if (event) {
eventContainer.querySelector('.date-day').textContent = dayNames[new Date(dateKey).getDay()];
eventContainer.querySelector('.date').textContent = i;
eventContainer.querySelector('.event').innerHTML = event.event;
} else {
eventContainer.querySelector('.date-day').textContent = dayNames[new Date(dateKey).getDay()];
eventContainer.querySelector('.date').textContent = i;
eventContainer.querySelector('.event').innerHTML = "<p>No event found for this date</p>";
}
});

fragment.appendChild(dayElement); // Append day element to fragment

if (i === todayDate && currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear()) {
dayElement.click(); // Trigger click event for today's date
}
}

daysContainer.innerHTML = ''; // Clear the container
daysContainer.appendChild(fragment); // Append fragment to container

// Call addRedDots() after the calendar is rendered
addRedDots();

// Call addGreenDots() after the calendar is rendered
addGreenDots();
})
.catch(error => {
console.error('Error fetching event data:', error);
});
}

// Assuming currentMonth and currentYear are defined globally or within the same scope

function addRedDots() {
const eventDates = ['2024-03-03', '2024-03-04', '2024-03-05', '2024-03-06', '2024-03-07', '2024-03-08', '2024-03-09', '2024-03-10'];

const days = document.querySelectorAll('.day-app');
days.forEach(day => {
const dayNum = parseInt(day.textContent);
const paddedMonth = String(currentMonth).padStart(2, '0');
const paddedDay = String(dayNum).padStart(2, '0');
const dateKey = `${currentYear}-${paddedMonth}-${paddedDay}`;
if (eventDates.includes(dateKey)) {
const dot = document.createElement('div');
dot.classList.add('red-dot');
day.appendChild(dot);
}
});
}

function addGreenDots() {
const eventDates = ['2024-03-11', '2024-03-17', '2024-03-24', '2024-03-31'];

const days = document.querySelectorAll('.day-app');
days.forEach(day => {
const dayNum = parseInt(day.textContent);
const paddedMonth = String(currentMonth).padStart(2, '0');
const paddedDay = String(dayNum).padStart(2, '0');
const dateKey = `${currentYear}-${paddedMonth}-${paddedDay}`;
if (eventDates.includes(dateKey)) {
const dot = document.createElement('div');
dot.classList.add('green-dot');
day.appendChild(dot);
}
});
}

renderCalendar();
});

// end of event calender //

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
const targetDate2 = new Date("2024-07-07T00:00:00");
setInterval(() => updateCountdown(targetDate2, "countdownOutput2"), 1000);


// Function to calculate total number of tests
function calculateTotalTests(testData) {
return testData.tests[0].links.length;
}

const cardData = [
{
id: 'anesthesia-link',
img: 'svg/anesthesia.svg',
title: 'Anesthesiology',
icon: 'anesthesia-icon',
json: 'data/anesthesia.json'
},
{
id: 'ent-link',
img: 'svg/ent.svg',
title: 'ENT',
icon: 'ent-icon',
json: 'data/ent.json'
},
{
id: 'ortho-link',
img: 'svg/ortho.svg',
title: 'Orthopaedics',
icon: 'ortho-icon',
json: 'data/ortho.json'
},    
{
id: 'obgy-link',
img: 'svg/obgy.svg',
title: 'Obs&Gyne',
icon: 'obgy-icon',
json: 'data/obgy.json'
},
{
id: 'surgery-link',
img: 'svg/surgery.svg',
title: 'Surgery',
icon: 'surgery-icon',
json: 'data/surgery.json'
},
{
id: 'medicine-link',
img: 'svg/medicine.svg',
title: 'Medicine',
icon: 'medicine-icon',
json: 'data/medicine.json'
},
{
id: 'pedia-link',
img: 'svg/pedia.svg',
title: 'Pediatrics',
icon: 'pedia-icon',
json: 'data/pedia.json'
},
{
id: 'radiology-link',
img: 'svg/radiology.svg',
title: 'Radiology',
icon: 'radiology-icon',
json: 'data/radiology.json'
},
{
id: 'anatomy-link',
img: 'svg/anatomy.svg',
title: 'Anatomy',
icon: 'anatomy-icon',
json: 'data/anatomy.json'
},
{
id: 'physiology-link',
img: 'svg/physiology.svg',
title: 'Physiology',
icon: 'physiology-icon',
json: 'data/physiology.json'
},
{
id: 'biochem-link',
img: 'svg/biochem.svg',
title: 'Biochemistry',
icon: 'biochem-icon',
json: 'data/biochem.json'
},
{
id: 'derma-link',
img: 'svg/derma.svg',
title: 'Dermatology',
icon: 'derma-icon',
json: 'data/derma.json'
},
{
id: 'eye-link',
img: 'svg/eye.svg',
title: 'Eye',
icon: 'eye-icon',
json: 'data/eye.json'
},
{
id: 'microbiology-link',
img: 'svg/microbiology.svg',
title: 'Microbiology',
icon: 'microbiology-icon',
json: 'data/microbiology.json'
},
{
id: 'patho-link',
img: 'svg/patho.svg',
title: 'Pathology',
icon: 'patho-icon',
json: 'data/patho.json'
},
{
id: 'pharma-link',
img: 'svg/pharma.svg',
title: 'Pharmacology',
icon: 'pharma-icon',
json: 'data/pharma.json'
},
{
id: 'psm-link',
img: 'svg/psm.svg',
title: 'PSM',
icon: 'psm-icon',
json: 'data/psm.json'
},
{
id: 'psychiatry-link',
img: 'svg/psychiatry.svg',
title: 'Psychiatry',
icon: 'psychiatry-icon',
json: 'data/psychiatry.json'
},
{
id: 'fmt-link',
img: 'svg/fmt.svg',
title: 'FMT',
icon: 'fmt-icon',
json: 'data/fmt.json'
}
// Add more card data as needed
];

// Function to create a card element
function createCard(cardInfo) {
const cardElement = document.createElement('div');
cardElement.classList.add('dash-card', 'card');
cardElement.style.justifyContent = 'center';

// Apply default style to the card with ID 'ent-link'
if (cardInfo.id === 'anesthesia-link') {
cardElement.style.backgroundColor = '#637A9F';
cardElement.style.color = 'white';
}

// Event listener to toggle active state and apply styles
cardElement.addEventListener('click', function() {
// Remove active state from all cards
document.querySelectorAll('.dash-card.card').forEach(function(card) {
card.style.backgroundColor = '';
card.style.color = '';
});
// Apply active state to the clicked card
cardElement.style.backgroundColor = '#637A9F';
cardElement.style.color = 'white';
});

// Fetch JSON data
fetch(cardInfo.json)
.then(response => response.json())
.then(data => {
// Calculate total test count using 'calculateTotalTests' function
const totalTests = calculateTotalTests(data);

// Update the total-test element
document.getElementById(`total-test-${cardInfo.id}`).innerHTML = totalTests;
})
.catch(error => console.error('Error fetching data:', error));

cardElement.innerHTML = `
<div>
<span><img src="${cardInfo.img}"></span>
</div>
<div>
${cardInfo.title}
</div>
<div class="card-text">
<span id="total-test-${cardInfo.id}"></span> Tests
</div>
`;

return cardElement;
}

// Function to handle card click
function handleCardClick(event) {
// Prevent the default behavior of the link
event.preventDefault();

// Get the ID of the clicked card
const cardId = event.currentTarget.id;

// Find the corresponding card data
const cardInfo = cardData.find(card => card.id === cardId);

// Perform the necessary action based on the card data
fetch(cardInfo.json)
.then(response => response.json())
.then(data => createTable(data, document.getElementById("dynamic-table"), cardInfo.icon))
.catch(error => console.error('Error fetching data:', error));
}

// Function to render cards
function renderCards() {
const cardContainer = document.getElementById('card-container');

cardData.forEach((cardInfo) => {
const cardElement = createCard(cardInfo);

const cardLink = document.createElement('a');
cardLink.href = '#'; // Set the link destination if needed
cardLink.id = cardInfo.id;
cardLink.appendChild(cardElement);

// Add click event listener to the link
cardLink.addEventListener('click', handleCardClick);

const cardWrapper = document.createElement('div');
cardWrapper.classList.add('cards');
cardWrapper.appendChild(cardLink);

cardContainer.appendChild(cardWrapper);
});
}

// Call the function to render cards
renderCards();

// Optional: If you want to disable right-click as well
document.addEventListener('contextmenu', function (e) {
e.preventDefault();
});


// script for timetable //
// JavaScript code goes here
// Function to fetch test events data from JSON and populate the timetable element
function fetchTestEventsAndPopulateTimetable() {
fetch('calendar-event.json')
.then(response => response.json())
.then(data => {
const timetableElement = document.getElementById('timetable');
const currentDate = new Date();

// Generate data for today and the next 3 days
for (let i = 0; i < 3; i++) {
const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000); // Calculate date for each day
const dayLabels = ['Today', 'Tomorrow', 'Day after Tomorrow'];
const dayLabel = dayLabels[i];

const dayTimeContainer = document.createElement('div');
dayTimeContainer.classList.add('test-container');

const dayTime = document.createElement('div');
dayTime.classList.add('day-time');
const dayLabelDiv = document.createElement('div');
dayLabelDiv.classList.add('test-date'); // Adding class to the day label div
dayLabelDiv.textContent = dayLabel;
const testDateDiv = document.createElement('div');
testDateDiv.classList.add('test-date');
testDateDiv.textContent = `${date.getDate()} ${getMonthName(date.getMonth())}`;

dayTime.appendChild(dayLabelDiv);
dayTime.appendChild(testDateDiv);

const eventData = data[formatDate(date)]; // Get event data for the current date
const testEvent = document.createElement('div');
testEvent.classList.add('test-event');
if (eventData) {
testEvent.innerHTML = eventData.event;
} else {
testEvent.innerHTML = `<p>No event scheduled</p>`;
}

dayTimeContainer.appendChild(dayTime);
dayTimeContainer.appendChild(testEvent);

timetableElement.appendChild(dayTimeContainer);
}
})
.catch(error => console.error('Error fetching test events data:', error));
}

// Helper function to get month name from month number
function getMonthName(month) {
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
return months[month];
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
return `${year}-${month}-${day}`;
}

// Call the function to fetch test events data and populate the timetable element
fetchTestEventsAndPopulateTimetable();

// end of timetable //


// dynamic table script 

function createTable(data, table, iconDivId) {
var oldTable = document.getElementById("dynamic-table");
oldTable.classList.remove("fade-in");
oldTable.classList.add("fade-out");

setTimeout(function () {
oldTable.classList.remove("fade-out");
oldTable.innerHTML = "";
table.classList.add("fade-in");

var newRow = table.insertRow(0);
var newCell = newRow.insertCell(0);

var div1 = document.createElement("div");
div1.classList.add("flex-question");

var jsonFileName = iconDivId.replace("-icon", "").replace("-", ".");
var iconPath = 'svg/' + jsonFileName + '.svg';

var imgDiv = document.createElement("div");
imgDiv.style.marginRight = "10px";
imgDiv.innerHTML = '<span><img src="' + iconPath + '"></span>';

var titleDiv = document.createElement("div");
titleDiv.innerHTML = '<span id="dynamic-title"></span>';

div1.appendChild(imgDiv);
div1.appendChild(titleDiv);

newCell.appendChild(div1);
newCell.classList.add("th");

var title = data.tests[0].title;
var titleElement = document.getElementById("dynamic-title");
titleElement.innerHTML = title;

data.tests[0].links.forEach(function (link) {
var row = table.insertRow();
var cell = row.insertCell();

var linkDiv = document.createElement("a");
linkDiv.id = "topic-link";
linkDiv.href = link.url;

var div1 = document.createElement("div");
div1.classList.add("table-flex");

var topicText = document.createElement("div");
topicText.classList.add("topic-text");
topicText.textContent = link.text;

var questionsDiv = document.createElement("div");
questionsDiv.classList.add("table-questions");
questionsDiv.textContent = link.questions + ' MCQs';

var completeDiv = document.createElement("div");
completeDiv.classList.add("date-complete");
completeDiv.textContent = 'Completed on ' + link.date_completed;

topicText.appendChild(questionsDiv);
topicText.appendChild(completeDiv);

var imgDiv = document.createElement("div");
imgDiv.innerHTML = '<img src="svg/right.svg">';

div1.appendChild(topicText);
div1.appendChild(imgDiv);

linkDiv.appendChild(div1);
cell.appendChild(linkDiv);
});
}, 500); // Adjust the delay based on the transition duration
}



function createDynamicTable(linkId, jsonFile, iconDivId) {
document.getElementById(linkId).addEventListener("click", function (event) {
event.preventDefault();

fetch(jsonFile)
.then(response => response.json())
.then(data => createTable(data, document.getElementById("dynamic-table"), iconDivId))
.catch(error => console.error('Error fetching data:', error));
});
}

// Modify each createDynamicTable call to incorporate the changes
createDynamicTable("surgery-link", "data/surgery.json", "surgery-icon");
createDynamicTable("medicine-link", "data/medicine.json", "medicine-icon");
createDynamicTable("obgy-link", "data/obgy.json", "obgy-icon");
createDynamicTable("pedia-link", "data/pedia.json", "pedia-icon");
createDynamicTable("ortho-link", "data/ortho.json", "ortho-icon");
createDynamicTable("anesthesia-link", "data/anesthesia.json", "anesthesia-icon");
createDynamicTable("radiology-link", "data/radiology.json", "radiology-icon");
createDynamicTable("anatomy-link", "data/anatomy.json", "anatomy-icon");
createDynamicTable("physiology-link", "data/physiology.json", "physiology-icon");
createDynamicTable("biochem-link", "data/biochem.json", "biochem-icon");
createDynamicTable("derma-link", "data/derma.json", "derma-icon");
createDynamicTable("eye-link", "data/eye.json", "eye-icon");
createDynamicTable("ent-link", "data/ent.json", "ent-icon");
createDynamicTable("microbiology-link", "data/microbiology.json", "microbiology-icon");
createDynamicTable("patho-link", "data/patho.json", "patho-icon");
createDynamicTable("pharma-link", "data/pharma.json", "pharma-icon");
createDynamicTable("psm-link", "data/psm.json", "psm-icon");
createDynamicTable("psychiatry-link", "data/psychiatry.json", "psychiatry-icon");
createDynamicTable("fmt-link", "data/fmt.json", "fmt-icon");

// Triggering the click event for "obgy-link"
document.getElementById("anesthesia-link").click();