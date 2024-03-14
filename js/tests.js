// Define cardData globally
let cardData;

// Fetch data from filePaths.json and populate cardData
fetch('filePaths.json')
.then(response => response.json())
.then(data => {
// Extract the dashboard key
const dashboard = data.dashboard;

// Recreate cardData array from the dashboard key
cardData = dashboard.map(item => ({
json: item.json,
title: item.title
}));

// Dynamically add id, img, and icon properties based on JSON file names
cardData.forEach(card => {
const jsonName = card.json.split('/').pop().split('.')[0];
card.id = `${jsonName}-link`;
card.img = `svg/${jsonName}.svg`;
card.icon = `${jsonName}-icon`;
});

// Call function to render cards after cardData is populated
renderCards();

// Call function to create dynamic tables after cardData is populated
cardData.forEach((cardInfo) => {
createDynamicTable(cardInfo.id, cardInfo.json, cardInfo.icon);
});

// Triggering the click event for "microbiology-link"
document.getElementById("microbiology-link").click();
})
.catch(error => console.error('Error fetching JSON:', error));

// Function to render cards
function renderCards() {
const cardContainer = document.getElementById('card-container');
cardData.forEach((cardInfo) => {
const cardElement = createCard(cardInfo);
const cardLink = document.createElement('a');
cardLink.href = '#';
cardLink.id = cardInfo.id;
cardLink.appendChild(cardElement);
cardLink.addEventListener('click', handleCardClick);
const cardWrapper = document.createElement('div');
cardWrapper.classList.add('cards');
cardWrapper.appendChild(cardLink);
cardContainer.appendChild(cardWrapper);
});
}

// Rest of your code remains the same


// Function to calculate total number of tests
function calculateTotalTests(testData) {
return testData.tests[0].links.length;
}

// Function to create a card element
function createCard(cardInfo) {
const cardElement = document.createElement('div');
cardElement.classList.add('dash-card', 'card');
cardElement.style.justifyContent = 'center';

// Apply default style to the card with ID 'microbiology-link'
if (cardInfo.title === 'Microbiology') {
cardElement.style.backgroundColor = '#637A9F';
cardElement.style.color = 'white';
}

// Event listener to toggle active state and apply styles
cardElement.addEventListener('click', function () {
// Remove active state from all cards
document.querySelectorAll('.dash-card.card').forEach(function (card) {
card.style.backgroundColor = '';
card.style.color = '';
});

// Apply active state to the clicked card
cardElement.style.backgroundColor = '#637A9F';
cardElement.style.color = 'white';
});

// Fetch JSON data and update the total-test element
fetch(cardInfo.json)
.then(response => response.json())
.then(data => {
const totalTests = calculateTotalTests(data);
document.getElementById(`total-test-${cardInfo.id}`).innerHTML = totalTests;
})
.catch(error => console.error('Error fetching data:', error));

// Card HTML content
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
event.preventDefault();
const cardId = event.currentTarget.id;
const cardInfo = cardData.find(card => card.id === cardId);
fetch(cardInfo.json)
.then(response => response.json())
.then(data => createTable(data, document.getElementById("dynamic-table"), cardInfo.icon))
.catch(error => console.error('Error fetching data:', error));
}

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
titleDiv.innerHTML = '<span id="dynamic-title"></span> Tests';

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