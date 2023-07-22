const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')
const baseUrl = window.location.origin
const host = window.location.host
const pathArray = window.location.pathname.split('/')
console.log(baseUrl)
const colors = [
  '#16F4D0',
  '#E0F2E9',
  '#3943B7',
  '#688E26',
  '#F44708',
  '#F65BE3',
  '#9D44B5',
  '#00F5D4',
]

let time = 0
let score = 0
startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.dataset.time)
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = time--
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<div class="finish-game-window">
  <h1>Score:<span class="primary">${score}</span></h1>
  <button type="button" class="btn-primary" id="restart-game">New game</button>
  </div>`
  const restartGameBtn = document.getElementById('restart-game')
  restartGameBtn.addEventListener('click', () => {
    location.reload()
    screens[0].classList.add('up')
  })
}
function createRandomCircle() {
  const color = getRandomColor()
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = color
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
