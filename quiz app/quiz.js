let currentQuestionIndex = 0;
let selectedOption = null;
let quizData = null;
let quizCompleted = false;

async function fetchQuizData() {
    try {
        const response = await fetch('quiz.json');
        quizData = await response.json();
        loadQuestion(quizData.questions[currentQuestionIndex]);
        populateQuestionList();
    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

function loadQuestion(questionData) {
  const questionTitleElement = document.getElementById('questionTitle');
  const questionSection = document.getElementById('questionSection');
  const explanationText = document.getElementById('explanation');
  const resultText = document.getElementById('result');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const quizScreen = document.getElementById('Quiz-screen');
  const reviewScreen = document.getElementById('Review-screen');
  const quizScoreSpan = document.getElementById('quizScore');

  // Reset UI elements
  selectedOption = null;
  questionSection.innerHTML = '';
  resultText.textContent = '';
  explanationText.textContent = '';
  nextBtn.style.display = 'none';
  quizScreen.style.display = 'block';
  reviewScreen.style.display = 'none';

  if (quizCompleted) {
      quizScreen.style.display = 'none';
      reviewScreen.style.display = 'block';
      quizScoreSpan.textContent = calculateQuizScore();
      return;
  }

  questionTitleElement.textContent = questionData.question;

  questionData.options.forEach(option => {
      const pElement = document.createElement('p');
      pElement.textContent = option.option;
      pElement.dataset.option = option.option; // Set data-option attribute
      pElement.addEventListener('click', () => selectOption(pElement));
      questionSection.appendChild(pElement);
  });

  backBtn.style.display = currentQuestionIndex > 0 ? 'block' : 'none';

  // Highlight the previously selected option
  const storedResponse = localStorage.getItem(`question${currentQuestionIndex}`);
  if (storedResponse) {
      const selectedOptionElement = questionSection.querySelector(`p[data-option="${storedResponse}"]`);
      if (selectedOptionElement) {
          selectOption(selectedOptionElement);
      }
  }
}

function selectOption(optionElement) {
  const options = document.querySelectorAll('.option');
  options.forEach(option => option.classList.remove('selected'));

  selectedOption = optionElement;
  selectedOption.classList.add('selected');
  checkAnswer();

  // Store selected option in local storage
  const selectedOptionText = selectedOption.textContent;
  localStorage.setItem(`question${currentQuestionIndex}`, selectedOptionText);
}

function checkAnswer() {
    const explanationText = document.getElementById('explanation');
    const resultText = document.getElementById('result');
    const nextBtn = document.getElementById('nextBtn');

    const selectedOptionText = selectedOption.textContent;
    const correctAnswerText = quizData.questions[currentQuestionIndex].correct_answer;
    const isCorrect = selectedOptionText === correctAnswerText;

    if (isCorrect) {
        selectedOption.classList.add('correct');
        resultText.textContent = 'Correct!';
    } else {
        selectedOption.classList.add('incorrect');
        resultText.textContent = 'Incorrect!';
    }

    explanationText.textContent = quizData.questions[currentQuestionIndex].explanation;
    nextBtn.style.display = 'block';
}

function calculateQuizScore() {
    let correctAnswers = 0;

    for (let i = 0; i < quizData.questions.length; i++) {
        const storedResponse = localStorage.getItem(`question${i}`);
        const correctAnswer = quizData.questions[i].correct_answer;

        if (storedResponse !== null && storedResponse === correctAnswer) {
            correctAnswers++;
        }
    }

    const scorePercentage = (correctAnswers / quizData.questions.length) * 100;
    return scorePercentage.toFixed(2) + '%';
}

function populateQuestionList() {
    const questionList = document.getElementById('question-list');
  
    quizData.questions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.textContent = question.question;
        questionItem.setAttribute('data-index', index);
        questionItem.addEventListener('click', displayQuestion);
        questionList.appendChild(questionItem);
    });
}

function displayQuestion(event) {
  const index = event.target.getAttribute('data-index');
  const selectedQuestion = quizData.questions[index];

  currentQuestionIndex = index; // Update the current question index

  // Load the question and its stored response
  loadQuestion(selectedQuestion);

  // Retrieve and highlight the stored response
  const storedResponse = localStorage.getItem(`question${index}`);
  if (storedResponse) {
      const selectedOptionElement = document.querySelector(`p[data-option="${storedResponse}"]`);
      if (selectedOptionElement) {
          selectOption(selectedOptionElement);
      }
  }
}

document.getElementById('backBtn').addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion(quizData.questions[currentQuestionIndex]);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.questions.length) {
        loadQuestion(quizData.questions[currentQuestionIndex]);
    } else {
        quizCompleted = true;
        loadQuestion(null);
    }
});

document.getElementById('finishQuizBtn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    quizCompleted = false;
    fetchQuizData();
});

fetchQuizData();