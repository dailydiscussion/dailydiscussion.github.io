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
'radiology.json','grandtest.json'
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
})
.catch(error => console.error('Error fetching JSON:', error));