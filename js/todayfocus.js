// Function to fetch JSON data and update HTML content dynamically
async function fetchAndUpdateQuizData(jsonFile, quizIds, containerId, linkPrefix, countPrefix, durationId) {
try {
const response = await fetch(jsonFile);
const jsonData = await response.json();

for (let quizId of quizIds) {
var quizEntry = jsonData.tests[0].links.find(link => link.id === quizId);

if (quizEntry) {
var jsonFileName = jsonFile.split('/').pop().split('.')[0];
var iconPath = 'svg/' + jsonFileName + '.svg';
var linkId = linkPrefix + quizId;
var countId = countPrefix + quizId;

var card = createQuizCard(containerId, quizEntry, iconPath, linkId, countId, durationId);

var container = document.getElementById(containerId);
container.appendChild(card);
} else {
console.error('Quiz entry not found in JSON data for quiz ID:', quizId);
}
}
} catch (error) {
console.error('Error fetching JSON:', error);
}
}

// Fetch and update Quiz-1 and Quiz-2 data
fetchAndUpdateQuizData('data/microbiology.json', ['Quiz', 'Quiz-2'], 'quizContainer', 'quizLink', 'MCQCount', 'duration');

// Fetch and update Grand Test data
fetchAndUpdateQuizData('data/grandtest.json', ['Quiz-3'], 'quizContainer', 'grandtest', 'MCQCount', 'duration');

// Function to create a new quiz card dynamically and return the created element
function createQuizCard(containerId, quizEntry, iconPath, linkId, countId, durationId) {
var card = document.createElement('a');
card.className = 'quiz-card';
card.id = linkId;
card.href = quizEntry.url;

var button = document.createElement('div');
button.className = 'button';

var actualContent = document.createElement('div');
actualContent.className = 'actualcontent';

var row1 = document.createElement('div');
row1.className = 'row-1';

var col1 = document.createElement('div');
col1.className = 'col-1';
var img = document.createElement('span');
var imgSrc = document.createElement('img');
imgSrc.src = iconPath;
img.appendChild(imgSrc);
col1.appendChild(img);

var col2 = document.createElement('div');
col2.className = 'col-2';
var topic = document.createElement('p');
topic.textContent = quizEntry.text;
col2.appendChild(topic);

var hr = document.createElement('hr');

var col3 = document.createElement('div');
col3.className = 'col-3';
var mcqCount = document.createElement('div');
mcqCount.textContent = '(' + quizEntry.questions + ' MCQs)';
var duration = document.createElement('div');
duration.textContent = quizEntry.duration;
col3.appendChild(mcqCount);
col3.appendChild(duration);

row1.appendChild(col1);
row1.appendChild(col2);
row1.appendChild(hr);
row1.appendChild(col3);
actualContent.appendChild(row1);
button.appendChild(actualContent);
card.appendChild(button);

return card;
}
