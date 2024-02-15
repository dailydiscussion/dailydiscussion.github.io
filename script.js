
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
fetch('data/obgy.json')
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
fetch('data/obgy.json')
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

// Function to fetch JSON data
async function fetchCalendarData() {
try {
const response = await fetch('calender.json');
const data = await response.json();
return data;
} catch (error) {
console.error('Error fetching calendar data:', error);
}
}

// Function to populate the calendar
async function populateCalendar() {
const data = await fetchCalendarData();

if (data) {
var calendarContainer = document.getElementById('calendarContainer');

data.entries.forEach(function (entry) {
var dayElement = document.createElement('div');
dayElement.className = 'day';
dayElement.id = 'day' + entry.id;

dayElement.innerHTML = `
<div class="day-name" id="dayName${entry.id}">${entry.day}</div>
<div class="day-date" id="dayDate${entry.id}">${entry.date}</div>
<div class="reminder-content">
<div class="meeting" id="meeting${entry.id}">${entry.meetings}</div>
</div>
`;

calendarContainer.appendChild(dayElement);
});
}
}

// Call the function to populate the calendar
populateCalendar();


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

const cardData = [{
id: 'obgy-link',
img: 'svg/obgy.svg',
title: 'Obs&gyne',
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
id: 'ortho-link',
img: 'svg/ortho.svg',
title: 'Orthopaedics',
icon: 'ortho-icon',
json: 'data/ortho.json'
},
{
id: 'anesthesia-link',
img: 'svg/anesthesia.svg',
title: 'Anesthesiology',
icon: 'anesthesia-icon',
json: 'data/anesthesia.json'
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
id: 'ent-link',
img: 'svg/ent.svg',
title: 'ENT',
icon: 'ent-icon',
json: 'data/ent.json'
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

        // Counter for serial number
        var serialNumber = 1;

        data.tests[0].links.forEach(function (link) {
            var row = table.insertRow();
            var cell = row.insertCell();

            var linkDiv = document.createElement("a");
            linkDiv.id = "topic-link";
            linkDiv.href = link.url;

            var div1 = document.createElement("div");
            div1.classList.add("table-flex");

            // Adding serial number
            var serialDiv = document.createElement("div");
            serialDiv.classList.add("table-no");
            var serialText = document.createElement("div");
            serialText.classList.add("table-no-text");
            serialText.textContent = serialNumber++;
            serialDiv.appendChild(serialText);

            var topicText = document.createElement("div");
            topicText.classList.add("topic-text");
            topicText.textContent = link.text;

            var questionsDiv = document.createElement("div");
            questionsDiv.classList.add("table-questions");
            questionsDiv.textContent = link.questions + ' MCQs';

            var completeDiv = document.createElement("div");
            completeDiv.classList.add("date-complete");
            completeDiv.textContent = 'Completed on ' + link.date_completed; // Assuming "date_completed" is a property of each link in the JSON data

            topicText.appendChild(questionsDiv);
            topicText.appendChild(completeDiv); // Appending date-complete div inside topic-text div

            serialDiv.appendChild(topicText); // Placing topic-text inside table-no div

            var imgDiv = document.createElement("div");
            imgDiv.innerHTML = '<img src="svg/right.svg">';

            div1.appendChild(serialDiv); // Adding serial number
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
document.getElementById("obgy-link").click();