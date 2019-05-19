'use strict'
// const zero = $('.zero')
const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

// const lines = {
//   rowOne: [$('.zero').html(), $('.one').html(), $('.two').html()],
//   rowTwo: [$('.three').html(), $('.four').html(), $('.five').html()],
//   rowThree: [$('.six').html(), $('.seven').html(), $('.eight').html()],
//   columnOne: [$('.zero').html(), $('.three').html(), $('.six').html()],
//   columnTwo: [$('.one').html(), $('.four').html(), $('.seven').html()],
//   columnThree: [$('.two').html(), $('.five').html(), $('.eight').html()],
//   diagOne: [$('.zero').html(), $('.four').html(), $('.eight').html()],
//   diagTwo: [$('.two').html(), $('.four').html(), $('.six').html()]
// }

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
const move = function (player) {
  $(event.target).html(player)
  moveArr.push('player')
  gameData.game.cell.index = $(event.target).data('cell-index')
  gameData.game.cell.value = player
  api.patchGameData(gameData, store.id)
    .then(ui.onPatchGameDataSuccess)
    .catch(ui.onPatchGameDataFailure)
}
const finalMove = function () {
  api.patchGameData(gameData, store.id)
    .then(ui.onPatchGameDataSuccess)
    .catch(ui.onPatchGameDataFailure)
}
const fillContent = function () {
  if (gameData.game.over === true) {
    $('.borg').html('Resistance is futile!')
  } else if ($(event.target).html() !== '') {
    $('.moveMessage').html('Choose an empty Square!')
  } else if ((moveArr.length % 2 !== 0) && (gameData.game.over === false)) {
    const player = 'o'
    $('.moveMessage').html(`It's X's turn`)
    move(player)
  } else if ((moveArr.length % 2 === 0) && (gameData.game.over === false)) {
    const player = 'x'
    $('.moveMessage').html(`It's O's turn`)
    move(player)
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
  if (lines.rowOne.every(i => i === 'x') || lines.rowTwo.every(i => i === 'x') || lines.rowThree.every(i => i === 'x') || lines.columnOne.every(i => i === 'x') || lines.columnTwo.every(i => i === 'x') || lines.columnThree.every(i => i === 'x') || lines.diagOne.every(i => i === 'x') || lines.diagTwo.every(i => i === 'x')) {
    $('h2').html('X wins!')
    $('.moveMessage').html('')
    gameData.game.over = true
    api.indexGamedata()
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  } else if (lines.rowOne.every(i => i === 'o') || lines.rowTwo.every(i => i === 'o') || lines.rowThree.every(i => i === 'o') || lines.columnOne.every(i => i === 'o') || lines.columnTwo.every(i => i === 'o') || lines.columnThree.every(i => i === 'o') || lines.diagOne.every(i => i === 'o') || lines.diagTwo.every(i => i === 'o')) {
    $('h2').html('O wins!')
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
    api.indexGamedata()
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  } else if (moveArr.length === 9) {
    $('h2').html('Cats!')
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
    api.indexGamedata()
      .then(ui.onIndexSuccess)
      .catch(ui.onIndexFailure)
  }
}
// let numGames = 0
const emptyContent = function () {
  $('.board').removeClass('disappear')
  $('.box').html('')
  $('h2').html('')
  $('.borg').html('')
  $('.gamesPlayed').html('')
  $('.moveMessage').html('')
  moveArr = []
  newGame()
  gameData.game.over = false
  $('#message').html('')
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

// $('h2').html() === ('X wins!') || ($('h2').html() === 'O wins!') || ($('h2').html() === 'Cats!')
module.exports = {
  fillContent,
  emptyContent,
  addHandlers

}
