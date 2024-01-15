// This script will refresh the page only once on load
if (!sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true');
    window.onload = function() {
    location.reload(true);
    };
    }

    fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        const tableContainer = document.getElementById('tableContainer');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        jsonData.tests.forEach(test => {
            const trHead = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = test.title;
            trHead.appendChild(th);
            thead.appendChild(trHead);

            test.links.forEach(link => {
                const trBody = document.createElement('tr');
                const td = document.createElement('td');
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.textContent = link.text;
                td.appendChild(anchor);
                trBody.appendChild(td);
                tbody.appendChild(trBody);
            });
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    })
    .catch(error => console.error('Error fetching data:', error));

// JavaScript to update the counter value
const counterElement = document.getElementById('counter');
const targetNumber = 150;
let currentNumber = 0;

function updateCounter() {
  if (currentNumber < targetNumber) {
    currentNumber++;
    counterElement.textContent = currentNumber;
    requestAnimationFrame(updateCounter);
  }
}

// Start the animation
updateCounter();

// Add the 'active' class to trigger the animation
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.animated-element').classList.add('active');
  });