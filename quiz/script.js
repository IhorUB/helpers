(function () {
  const apiLink = 'https://opentdb.com/api.php?amount=10&type=multiple';

  const quiz = document.getElementById('quiz');
  const questionEl = document.getElementById('quiz-question');
  const categoryEl = document.getElementById('quiz-category');
  const difficultyEl = document.getElementById('quiz-difficulty');
  const questionOptions = document.querySelectorAll('.quiz-list__item label');
  const questionEls = document.querySelectorAll('.answer');
  const submitBtn = document.getElementById('quiz-submit');

  let score = 0;
  let currentQuiz = 0;
  let response = [];

  getData().then(res => {
    response = res.map(question => {
      question.answers = [question.correct_answer, ...question.incorrect_answers].sort();
      return question;
    });
    loadQuiz();
  });

  async function getData() {
    try {
      const res = await fetch(apiLink);
      const {results} = await res.json();
      return results;
    } catch (e) {
      console.error(e);
    }
  }

  function loadQuiz() {
    updateAnswers();
    const currentQuizQuestion = response[currentQuiz];
    questionEl.innerText = currentQuizQuestion.question;
    categoryEl.innerText = currentQuizQuestion.category;
    difficultyEl.innerText = currentQuizQuestion.difficulty;

    for (let i = 0; i < questionOptions.length; i++) {
      questionOptions[i].innerText = currentQuizQuestion.answers[i];
    }
  }

  function updateAnswers() {
    questionEls.forEach(input => input.checked = false);
  }

  submitBtn.addEventListener('click', () => {
    const answer = getSelectedValue() || null;
    if (!answer) return;
    if (answer === response[currentQuiz].correct_answer) score++;

    currentQuiz++;

    if (currentQuiz < response.length) return loadQuiz();

    quiz.innerHTML = `<h2>You answered correctly at ${score}/${response.length} questions</h2>
    <button class="quiz-btn" onClick="location.reload()">Start new quiz</button>`;
  });

  function getSelectedValue() {
    let value;
    questionEls.forEach(input => {
      if (input.checked) {
        value = input.nextSibling.nextElementSibling.innerText;
      }
    });
    return value;
  }

})();