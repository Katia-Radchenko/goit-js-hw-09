const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
refs.start.addEventListener('click', startColor);
refs.stop.addEventListener('click', stopColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId = null;

function startColor() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000)

  refs.start.setAttribute('disabled', true)
  refs.stop.removeAttribute('disabled')
}

function stopColor() {
  clearInterval(intervalId);

  refs.stop.setAttribute('disabled', true)
  refs.start.removeAttribute('disabled')
}