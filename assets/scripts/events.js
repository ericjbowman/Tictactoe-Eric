'use strict'
// const zero = $('.zero')
const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const gameData = {
  game: {
    cell: {
      index: 1,
      value: ''
    },
    over: false
  }
}
// DRY as the ocean...
let moveArr = []
const newGame = function () {
  if (moveArr.length === 0) {
    api.startGame()
      .then(ui.onStartGameSuccess)
      .catch(ui.onStartGameFailure)
  }
}
const fillContent = function () {
  if ($('h2').html() === ('X wins!') || ($('h2').html() === 'O wins!') || ($('h2').html() === 'Cats!')) {
    $('.moveMessage').html('Resistance is futile!')
  } else if ($(event.target).html() !== '') {
    $('h2').html('Choose an empty Square!')
  } else if (moveArr.length % 2 !== 0) {
    $('h2').html('')
    $(event.target).html('O')
    gameData.game.cell.index = $(event.target).data('cell-index')
    gameData.game.cell.value = 'o'
    console.log(store.id)
    api.patchGameData(gameData, store.id)
      .then(ui.onPatchGameDataSuccess)
      .catch(ui.onPatchGameDataFailure)
    moveArr.push('O')
  } else if (moveArr.length % 2 === 0) {
    $('h2').html('')
    $(event.target).html('X')
    gameData.game.cell.index = $(event.target).data('cell-index')
    gameData.game.cell.value = 'x'
    api.patchGameData(gameData, store.id)
      .then(ui.onPatchGameDataSuccess)
      .catch(ui.onPatchGameDataFailure)
    moveArr.push('X')
  }
  const lines = {
    rowOne: [$('.zero').html(), $('.one').html(), $('.two').html()],
    rowTwo: [$('.three').html(), $('.four').html(), $('.five').html()],
    rowThree: [$('.six').html(), $('.seven').html(), $('.eight').html()],
    columnOne: [$('.zero').html(), $('.three').html(), $('.six').html()],
    columnTwo: [$('.one').html(), $('.four').html(), $('.seven').html()],
    columnThree: [$('.two').html(), $('.five').html(), $('.eight').html()],
    diagOne: [$('.zero').html(), $('.four').html(), $('.eight').html()],
    diagTwo: [$('.two').html(), $('.four').html(), $('.six').html()]
  }
  if (lines.rowOne.every(i => i === 'X') || lines.rowTwo.every(i => i === 'X') || lines.rowThree.every(i => i === 'X') || lines.columnOne.every(i => i === 'X') || lines.columnTwo.every(i => i === 'X') || lines.columnThree.every(i => i === 'X') || lines.diagOne.every(i => i === 'X') || lines.diagTwo.every(i => i === 'X')) {
    $('h2').html('X wins!')
    gameData.game.over = true
    api.indexGamedata()
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  } else if (lines.rowOne.every(i => i === 'O') || lines.rowTwo.every(i => i === 'O') || lines.rowThree.every(i => i === 'O') || lines.columnOne.every(i => i === 'O') || lines.columnTwo.every(i => i === 'O') || lines.columnThree.every(i => i === 'O') || lines.diagOne.every(i => i === 'O') || lines.diagTwo.every(i => i === 'O')) {
    $('h2').html('O wins!')
    gameData.game.over = true
    api.patchGameData(gameData, store.id)
      .then(console.log(gameData))
      .catch(console.log('did not work'))
    api.indexGamedata()
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  } else if (moveArr.length === 9) {
    $('h2').html('Cats!')
    gameData.game.over = true
    api.patchGameData(gameData, store.id)
      .then(console.log(gameData))
      .catch(console.log('did not work'))
    api.indexGamedata()
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  }
}
// let numGames = 0
const emptyContent = function () {
  $('.box').html('')
  $('h2').html('')
  $('.borg').html('')
  $('.gamesPlayed').html('')
  moveArr = []
  newGame()
  gameData.game.over = false
}
// const gameData = {}

// const onStartGame = function () {
//   api.startGame(gameData)
//   console.log(gameData)
// }

const onSignUp = function (event) {
  event.preventDefault()
  console.log('sign up ran!')

  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
  // $('#sign-up').html('')
}

const onSignIn = function (event) {
  event.preventDefault()
  console.log('sign in ran!')
  // $('#sign-in').html('')

  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('sign out ran')

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  console.log('change password ran!')

  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

// const cells = []
// cells[0] = $('.zero').html()
// cells[1] = $('.one').html()
// cells[2] = $('.two').html()
// cells[3] = $('.three').html()
// cells[4] = $('.four').html()
// cells[5] = $('.five').html()
// cells[6] = $('.six').html()
// cells[7] = $('.seven').html()
// cells[8] = $('.eight').html()
// console.log(cells)

module.exports = {
  fillContent,
  emptyContent,
  addHandlers

}
