// Function to calculate total number of tests
function calculateTotalTests(testData) {
return testData.tests[0].links.length;
}

const cardData = [
{
id: 'grandtest-link',
img: 'svg/grandtest.svg',
title: 'Grand&nbsp;Tests',
icon: 'grandtest-icon',
json: 'data/grandtest.json'
},
{
id: 'microbiology-link',
img: 'svg/microbiology.svg',
title: 'Microbiology',
icon: 'microbiology-icon',
json: 'data/microbiology.json'
},
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

    // Extract JSON name from the cardInfo.json path
    const jsonName = cardInfo.json.split('/').pop().split('.')[0];

    // Apply default style to the card with ID 'ent-link'
    if (jsonName === 'microbiology') {
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
            document.getElementById(`total-test-${jsonName}-link`).innerHTML = totalTests;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Card HTML content
    cardElement.innerHTML = `
        <div>
            <span><img src="svg/${jsonName}.svg"></span>
        </div>
        <div>
            ${cardInfo.title}
        </div>
        <div class="card-text">
            <span id="total-test-${jsonName}-link"></span> Tests
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

renderCards();
cardData.forEach((cardInfo) => {
createDynamicTable(cardInfo.id, cardInfo.json, cardInfo.icon);
});

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

cardData.forEach((cardInfo) => {
createDynamicTable(cardInfo.id, cardInfo.json, cardInfo.icon);
});

// Triggering the click event for "obgy-link"
document.getElementById("microbiology-link").click();