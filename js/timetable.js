
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
