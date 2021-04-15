const p1 = {
  score: 0,
  button: document.querySelector('#p1Button'),
  display: document.querySelector('#p1Display'),
};

const p2 = {
  score: 0,
  button: document.querySelector('#p2Button'),
  display: document.querySelector('#p2Display'),
};

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 0;
let isGameOver = false;

const saveButton = document.querySelector('#save');
const resetScores = document.querySelector('#delete');
let scoreList = document.querySelector('#list');

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add('has-text-success');
      opponent.display.classList.add('has-text-danger');
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener('click', function () {
  updateScores(p1, p2);
});

p2.button.addEventListener('click', function () {
  updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function () {
  winningScore = parseInt(this.value);
  reset();
});

resetButton.addEventListener('click', reset);

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove('has-text-success', 'has-text-danger');
    p.button.disabled = false;
  }
  //   p1.score = 0;
  //   p2.score = 0;
  //   p1.display.textContent = 0;
  //   p2.display.textContent = 0;
  //   p1.button.disabled = false;
  //   p2.button.disabled = false;
  //   p2.display.classList.remove('has-text-success', 'has-text-danger');
  //   p2.display.classList.remove('has-text-success', 'has-text-danger');
}

saveButton.addEventListener('click', function () {
  const p1Score = p1.score;
  const p2Score = p2.score;

  if (p1Score && p2Score) {
    localStorage.setItem(p1Score, p2Score);
    location.reload();
  }
});

for (let i = 0; i < localStorage.length; i++) {
  const p1Score = localStorage.key(i);
  const p2Score = localStorage.getItem(p1Score);

  scoreList.innerHTML += `<p class='is-size-2'>	👨🏻‍🦰${p1Score} : ${p2Score}👦🏻<br />`;
}

resetScores.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});
// const saveButton = document.querySelector('#save');
// const resetScores = document.querySelector('#delete');
// let scoreList = document.querySelector('#list');
