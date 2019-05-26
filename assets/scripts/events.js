'use strict'
// const zero = $('.zero')
const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('./store')

const localCells = [$('.zero').html(), $('.one').html(), $('.two').html(), $('.three').html(), $('.four').html(), $('.five').html(), $('.six').html(), $('.seven').html(), $('.eight').html()]
const rowOne = [localCells[0], localCells[1], localCells[2]]
const rowTwo = [localCells[3], localCells[4], localCells[5]]
const rowThree = [localCells[6], localCells[7], localCells[8]]
const columnOne = [localCells[0], localCells[3], localCells[6]]
const columnTwo = [localCells[1], localCells[4], localCells[7]]
const columnThree = [localCells[2], localCells[5], localCells[8]]
const diagOne = [localCells[0], localCells[4], localCells[8]]
const diagTwo = [localCells[2], localCells[4], localCells[6]]

let comp = false
const selfMode = function () {
  comp = false
  $(this).closest('.modal')
  $('.moveMessage').html('Good Luck!')
}
const compMode = function () {
  comp = true
  $(this).closest('.modal')
  $('.moveMessage').html("It's your turn! You: X Computer: O")
}

const computerMove = function () {
  $('.moveMessage').html("It's your turn! You: X Computer: O")
  const cells = [$('.zero').html(), $('.one').html(), $('.two').html(), $('.three').html(), $('.four').html(), $('.five').html(), $('.six').html(), $('.seven').html(), $('.eight').html()]
  let unusedCellIndexes = []
  function getAllIndexes (arr, val, sec) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== val && arr[i] !== sec) {
        unusedCellIndexes.push(i)
      }
    }
  }
  getAllIndexes(cells, 'x', 'o')
  let n = Math.floor((Math.random() * (unusedCellIndexes.length)))
  $(`div[data-cell-index=${unusedCellIndexes[n]}]`).html('o')
  moveArr.push('o')
  if (unusedCellIndexes.length === 0) {
    $('h2').html('Cats!')
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
  }
}

// This is the data sent to the api
const gameData = {
  game: {
    cell: {
      index: 1,
      value: ''
    },
    over: false
  }
}
// moveArr is an arry of moves in order that they are made
let moveArr = []
// Initiates a new game
const newGame = function () {
  if (moveArr.length === 0) {
    api.startGame()
      .then(ui.onStartGameSuccess, gameData.game.over = false)
      .catch(ui.onStartGameFailure)
  }
}
// move function shows the move on gameboard and updates api with cell index, value, and whether the game is over
const move = function (player) {
  $(event.target).html(player)
  // moveArr.push('player')
  gameData.game.cell.index = $(event.target).data('cell-index')
  gameData.game.cell.value = player
  api.patchGameData(gameData, store.id)
    .then(moveArr.push('player'))
    .catch(ui.onPatchGameDataFailure)
}
// triggerIndexSuccess ensures that the api patch happens before the api index occurs
const triggerIndexSuccess = function () {
  api.indexGamedata()
    .then(ui.onIndexSuccess)
    .catch(ui.onIndexFailure)
}
// finalMove initiates an API patch for gameData and API index if successfull
const finalMove = function () {
  api.patchGameData(gameData, store.id)
    // .then(ui.logPatchData)
    .then(triggerIndexSuccess())
    .catch(ui.onPatchGameDataFailure)
}
// fillContent is triggered by clicking a square. It checks if the game is over, if the square is already clicked, and whose turn it is, assigning player 'o' or 'x'.
// Then it checks for a win or tie, let's the player know the result, and triggers finalMove.

const checkForWin = function () {
  const localCells = [$('.zero').html(), $('.one').html(), $('.two').html(), $('.three').html(), $('.four').html(), $('.five').html(), $('.six').html(), $('.seven').html(), $('.eight').html()]
  const rowOne = [localCells[0], localCells[1], localCells[2]]
  const rowTwo = [localCells[3], localCells[4], localCells[5]]
  const rowThree = [localCells[6], localCells[7], localCells[8]]
  const columnOne = [localCells[0], localCells[3], localCells[6]]
  const columnTwo = [localCells[1], localCells[4], localCells[7]]
  const columnThree = [localCells[2], localCells[5], localCells[8]]
  const diagOne = [localCells[0], localCells[4], localCells[8]]
  const diagTwo = [localCells[2], localCells[4], localCells[6]]
  if (rowOne.every(i => i === 'x') || rowTwo.every(i => i === 'x') || rowThree.every(i => i === 'x') || columnOne.every(i => i === 'x') || columnTwo.every(i => i === 'x') || columnThree.every(i => i === 'x') || diagOne.every(i => i === 'x') || diagTwo.every(i => i === 'x')) {
    $('h2').html('X wins!')
    $('.moveMessage').html('')
    alert(localCells)
    gameData.game.over = true
    finalMove()
  } else if (rowOne.every(i => i === 'o') || rowTwo.every(i => i === 'o') || rowThree.every(i => i === 'o') || columnOne.every(i => i === 'o') || columnTwo.every(i => i === 'o') || columnThree.every(i => i === 'o') || diagOne.every(i => i === 'o') || diagTwo.every(i => i === 'o')) {
    $('h2').html('O wins!')
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
  } else if (moveArr.length === 9) {
    $('h2').html('Cats!')
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
  }
}

const fillContent = function () {
  if (gameData.game.over === true) {
    $('.borg').html('Resistance is futile!')
    return
  } else if ($(event.target).html() !== '') {
    $('.moveMessage').html('Choose an empty Square!')
    return
  } else if (comp === true) {
    const player = 'x'
    move(player)
  } else if ((moveArr.length % 2 !== 0) && (gameData.game.over === false)) {
    const player = 'o'
    $('.moveMessage').html(`It's X's turn`)
    move(player)
  } else if ((moveArr.length % 2 === 0) && (gameData.game.over === false)) {
    const player = 'x'
    $('.moveMessage').html(`It's O's turn`)
    move(player)
  }
  checkForWin()
  if (gameData.game.over === true) {
    return
  }
  if (comp === true) {
    computerMove()
    checkForWin()
  }
}
// emptyContent is triggered by the newGame button and removes messages and contents of game board. It also triggers newGame,
// posting a new game to the api.
const emptyContent = function () {
  $('.board').removeClass('disappear')
  $('.box').html('')
  $('h2').html('')
  $('.borg').html('')
  $('.gamesPlayed').html('')
  $('.moveMessage').html('')
  moveArr = []
  gameData.game.over = false
  newGame()
  $('#message').html('')
  $('s-in').html('')
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  // $('#sign-in').html('')

  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
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

module.exports = {
  fillContent,
  emptyContent,
  addHandlers,
  compMode,
  selfMode

}
