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

const fetchData = async () => {
try {
// Fetch filePaths.json to get the list of files for the dashboard
const response = await fetch('filePaths.json');
const filePaths = await response.json();

// Extract the list of files from the dashboard key
const files = filePaths.dashboard;

// Fetch JSON data from all files listed in the dashboard
const responses = await Promise.all(files.map(file => fetch(file.json).then(response =>
response.json())));

return responses;
} catch (error) {
console.error('Error fetching data:', error);
return [];
}
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
})
.catch(error => console.error('Error fetching JSON:', error));