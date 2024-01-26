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
        div1.style.justifyContent = "center";

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

            var div1 = document.createElement("div");
            div1.classList.add("table-flex");

            var topicText = document.createElement("div");
            topicText.id = "topic-text";
            topicText.innerHTML = link.text;

            var questionsDiv = document.createElement("div");
            questionsDiv.classList.add("table-questions");
            questionsDiv.innerHTML = '(' + link.questions + ' MCQs)';

            topicText.appendChild(questionsDiv);

            var div2 = document.createElement("div");

            var linkButton = document.createElement("a");
            linkButton.id = "topic-link";
            linkButton.href = link.url;

            var button = document.createElement("button");
            button.innerHTML = "Review";
            button.classList.add("table-button");

            linkButton.appendChild(button);
            div2.appendChild(linkButton);

            div1.appendChild(topicText);
            div1.appendChild(div2);

            cell.appendChild(div1);
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

createDynamicTable("surgery-link", "data/surgery.json", "surgery-icon");
createDynamicTable("test-link", "data/test.json", "test-icon");

document.getElementById("surgery-link").click();