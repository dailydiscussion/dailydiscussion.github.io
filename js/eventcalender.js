
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
const eventDates = ['2024-04-04', '2024-04-05', '2024-04-06', '2024-04-08', '2024-04-09'];

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
const eventDates = ['2024-04-10','2024-04-11','2024-04-12','2024-04-13','2024-04-14', '2024-05-15', '2024-06-16'];

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