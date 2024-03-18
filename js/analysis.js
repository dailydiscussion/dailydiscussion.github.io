// Function to fetch data from a JSON file and filter tests for a range of dates
async function fetchDataAndFilter(startDate, endDate, jsonFile) {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const testsForDateRange = getTestsForDateRange(jsonData, startDate, endDate);
        return testsForDateRange;
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
        return [];
    }
}

// Function to combine data from multiple arrays of tests
function combineTestArrays(arrays) {
    return arrays.flat();
}

// Function to calculate total number of days discussed in the last 7 days
function calculateTotalDaysDiscussed(tests, startDate, endDate) {
    const discussedDates = tests
        .map(test => new Date(test.timestamp).toDateString())
        .filter(dateString => {
            const date = new Date(dateString);
            return date >= startDate && date <= endDate;
        });

    const allDates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        allDates.push(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const missingDates = allDates.filter(date => !discussedDates.includes(date));
    console.log("Discussed Dates:", discussedDates);
    console.log("All Dates:", allDates);
    console.log("Missing Dates:", missingDates);
    const totalDaysDiscussed = 8 - missingDates.length;
    return totalDaysDiscussed;
}


// Calculate start date (today's date - 7 days)
const startDate = new Date();
startDate.setDate(startDate.getDate() - 7);

// End date is today's date
const endDate = new Date();

// Fetch data from the JSON files listed in the dashboard
const filePathsJson = 'filePaths.json';
fetch(filePathsJson)
    .then(response => response.json())
    .then(data => {
        const promises = data.dashboard.map(item => fetchDataAndFilter(startDate, endDate, item.json));
        return Promise.all(promises);
    })
    .then(testsArrays => {
        // Combine tests from all JSON files
        const combinedTests = combineTestArrays(testsArrays);

        // Calculate total number of questions and tests
        const totalQuestions = combinedTests.reduce((total, test) => total + parseInt(
            test.questions), 0);
        const totalTests = combinedTests.length;

        // Calculate total number of days discussed
        const totalDaysDiscussed = calculateTotalDaysDiscussed(combinedTests, startDate,
            endDate);

        // Update the HTML elements with the calculated values
        document.getElementById('totalQuestionsOutput').textContent = '+' + totalQuestions;
        document.getElementById('totalTestsOutput').textContent = '+' + totalTests;
        document.getElementById('totalDaysDiscussedOutput').textContent = '+' + totalDaysDiscussed;        
    })
    .catch(error => {
        console.error('There was a problem fetching the data or combining tests:',
            error);
    });

// Function to fetch tests for a range of dates
function getTestsForDateRange(jsonData, startDate, endDate) {
    const testsForRange = [];
    jsonData.tests.forEach(subject => {
        subject.links.forEach(test => {
            const testDate = new Date(test.timestamp);
            if (testDate >= startDate && testDate <= endDate) {
                testsForRange.push(test);
            }
        });
    });
    return testsForRange;
}