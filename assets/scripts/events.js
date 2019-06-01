'use strict'
// const zero = $('.zero')
const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('./store')
// comp is a boolean used to play against an AI opponent. Ultron is a boolean used to make AI unbeatable.
let xWins = 0
let oWins = 0
// moveArr is an arry of moves in order that they are made
let moveArr = []
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

let comp = false
let ultron = false

const selfMode = function () {
  comp = false
  ultron = false
  $(this).closest('.modal')
  $('.moveMessage').html('Good Luck!')
}

const compMode = function () {
  comp = true
  ultron = false
  $(this).closest('.modal')
  $('.moveMessage').html("It's your turn! You: X Computer: O")
}

const ultronMode = function () {
  comp = true
  ultron = true
  $('.moveMessage').html("It's your turn! You: X Ultron: O")
}

const winner = function (array) {
  // let xWins = 0
  // let xYins = 0
  const winningCombos = [[array[0], array[1], array[2]], [array[3], array[4], array[5]], [array[6], array[7], array[8]], [array[0], array[3], array[6]], [array[1], array[4], array[7]], [array[2], array[5], array[8]], [array[0], array[4], array[8]], [array[2], array[4], array[6]]]
  if (winningCombos.some(line => line.every(cell => cell === 'x'))) {
    xWins++
  } if (winningCombos.some(line => line.every(cell => cell === 'o'))) {
    oWins++
  }
}
const checkAllWins = function () {
  store.GamesArray.forEach(game => {
    winner(game)
  })
}
// computerMove finds available cells and chooses randomly from them unless Ultron mode is on. Ultron makes decisions based on X moves to prevent X win.
const computerMove = function () {
  gameData.game.cell.value = 'o'
  if (ultron === false) {
    $('.moveMessage').html("It's your turn! You: X Computer: O")
  } else if (ultron === true) {
    $('.moveMessage').html("It's your turn! You: X Ultron: O")
  }
  // cells is an array of the contents of all squares on the gameboard
  const cells = [$('.zero').html(), $('.one').html(), $('.two').html(), $('.three').html(), $('.four').html(), $('.five').html(), $('.six').html(), $('.seven').html(), $('.eight').html()]
  // lines is an array of rows, columns, and diagonals on the gameboard
  const lines = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
  ]
  const unusedCellIndexes = []
  // openRows is an array of rows, columns, and diagonals that are still open for moves
  const openRows = lines.filter(line => line.some(square => $(`div[data-cell-index=${square}]`).html() === ''))
  // getALLIndexes sorts through the cells and moves open cells to the unusedCellIndexes array
  function getAllIndexes (arr, val, sec) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== val && arr[i] !== sec) {
        unusedCellIndexes.push(i)
      }
    }
  }
  getAllIndexes(cells, 'x', 'o')
  // First two conditionals are for Ultron to prevent a fork in which player x has two winning routes
  // Then Ultron checks for a 2 'o's in a row and fills the empty cell if it's open
  // If there are not 2 o's, Ultron checks for 2 'x's in a row and fills the next cell to prevent an X win
  // If there are not 2 in a row, Ultron will randomly choose a cell to fill. This is what the computer opponent does every move.
  if (unusedCellIndexes.length === 8 && $('.four').html() === 'x' && ultron === true) {
    $('.zero').html('o')
    $('.zero').addClass('o')
    $('.zero').removeClass('xhov')
    gameData.game.cell.index = 0
  } else if (($('.zero').html() === 'x' || $('.two').html() === 'x' || $('.six').html() === 'x' || $('.eight').html() === 'x') && unusedCellIndexes.length === 8 && ultron === true) {
    $('.four').html('o')
    $('.four').addClass('o')
    $('.four').removeClass('xhov')
    gameData.game.cell.index = 4
  } else if ((unusedCellIndexes.length < 8) && (openRows.some(line => (($(`div[data-cell-index=${line[0]}]`).html() === 'o' && $(`div[data-cell-index=${line[1]}]`).html() === 'o')) || (($(`div[data-cell-index=${line[0]}]`).html() === 'o' && $(`div[data-cell-index=${line[2]}]`).html() === 'o')) || (($(`div[data-cell-index=${line[1]}]`).html() === 'o' && $(`div[data-cell-index=${line[2]}]`).html() === 'o')))) && ultron === true) {
    for (let i = 0; i < cells.length; i++) {
      if (((($(`div[data-cell-index=${openRows[i][0]}]`).html() === 'o' && $(`div[data-cell-index=${openRows[i][1]}]`).html() === 'o')) || (($(`div[data-cell-index=${openRows[i][0]}]`).html() === 'o' && $(`div[data-cell-index=${openRows[i][2]}]`).html() === 'o')) || (($(`div[data-cell-index=${openRows[i][1]}]`).html() === 'o' && $(`div[data-cell-index=${openRows[i][2]}]`).html() === 'o')))) {
        const compBlock = openRows[i].filter(square => $(`div[data-cell-index=${square}]`).html() === '')
        if ((compBlock) && ($(`div[data-cell-index=${compBlock}]`).html() === '')) {
          $(`div[data-cell-index=${compBlock}]`).html('o')
          $(`div[data-cell-index=${compBlock}]`).addClass('o')
          $(`div[data-cell-index=${compBlock}]`).removeClass('xhov')
          gameData.game.cell.index = compBlock[0]
          break
        }
      }
    }
  } else if ((unusedCellIndexes.length < 8) && (openRows.some(line => (($(`div[data-cell-index=${line[0]}]`).html() === 'x' && $(`div[data-cell-index=${line[1]}]`).html() === 'x')) || (($(`div[data-cell-index=${line[0]}]`).html() === 'x' && $(`div[data-cell-index=${line[2]}]`).html() === 'x')) || (($(`div[data-cell-index=${line[1]}]`).html() === 'x' && $(`div[data-cell-index=${line[2]}]`).html() === 'x')))) && ultron === true) {
    for (let i = 0; i < cells.length; i++) {
      if (((($(`div[data-cell-index=${openRows[i][0]}]`).html() === 'x' && $(`div[data-cell-index=${openRows[i][1]}]`).html() === 'x')) || (($(`div[data-cell-index=${openRows[i][0]}]`).html() === 'x' && $(`div[data-cell-index=${openRows[i][2]}]`).html() === 'x')) || (($(`div[data-cell-index=${openRows[i][1]}]`).html() === 'x' && $(`div[data-cell-index=${openRows[i][2]}]`).html() === 'x')))) {
        const compBlock = openRows[i].filter(square => $(`div[data-cell-index=${square}]`).html() === '')
        if ((compBlock) && ($(`div[data-cell-index=${compBlock}]`).html() === '')) {
          $(`div[data-cell-index=${compBlock}]`).html('o')
          $(`div[data-cell-index=${compBlock}]`).addClass('o')
          $(`div[data-cell-index=${compBlock}]`).removeClass('xhov')
          gameData.game.cell.index = compBlock[0]
          break
        }
      }
    }
  } else {
    const n = Math.floor((Math.random() * (unusedCellIndexes.length)))
    $(`div[data-cell-index=${unusedCellIndexes[n]}]`).html('o')
    $(`div[data-cell-index=${unusedCellIndexes[n]}]`).addClass('o')
    $(`div[data-cell-index=${unusedCellIndexes[n]}]`).removeClass('xhov')
    gameData.game.cell.index = unusedCellIndexes[n]
  }
  moveArr.push('o')
  api.patchGameData(gameData, store.id)
    .then(ui.onPatchGameDataSuccess)
    .then(checkForWin)
}

const triggerComp = function () {
  if (comp === true && gameData.game.over === false) {
    computerMove()
  }
}
// Initiates a new game
const newGame = function () {
  if (moveArr.length === 0) {
    api.startGame()
      .then(ui.onStartGameSuccess, gameData.game.over = false)
  }
}
// move function shows the move on gameboard and updates api with cell index, value, and whether the game is over
const move = function (player) {
  $(event.target).html(player)
  $(event.target).addClass(`${player}`)
  $(event.target).removeClass('xhov')
  $(event.target).removeClass('ohov')
  moveArr.push(player)
  gameData.game.cell.index = $(event.target).data('cell-index')
  gameData.game.cell.value = player
  api.patchGameData(gameData, store.id)
    .then(ui.onPatchGameDataSuccess)
    .then(triggerComp)
}
// triggerIndexSuccess ensures that the api patch happens before the api index occurs
const triggerIndexSuccess = function () {
  api.indexGamedata()
    .then(ui.onIndexSuccess)
    .then(checkAllWins)
    .then(() => $('.wins').html(`X wins: ${xWins}, O wins: ${oWins}`))
}
// finalMove initiates an API patch for gameData and API index if successfull
const finalMove = function () {
  api.patchGameData(gameData, store.id)
    .then(triggerIndexSuccess)
}

// checkForWin checks for a win or tie, let's the player know the result, and triggers finalMove.
const checkForWin = function () {
  const localCells = [$('.zero').html(), $('.one').html(), $('.two').html(), $('.three').html(), $('.four').html(), $('.five').html(), $('.six').html(), $('.seven').html(), $('.eight').html()]
  const localLines = [[localCells[0], localCells[1], localCells[2]], [localCells[3], localCells[4], localCells[5]], [localCells[6], localCells[7], localCells[8]], [localCells[0], localCells[3], localCells[6]], [localCells[1], localCells[4], localCells[7]], [localCells[2], localCells[5], localCells[8]], [localCells[0], localCells[4], localCells[8]], [localCells[2], localCells[4], localCells[6]]]
  if (localLines.some(line => line.every(cell => cell === 'x'))) {
    $('h2').html('X wins!')
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
    $('#anim').addClass('enable')
    $('.box').removeClass('xhov')
    $('.box').removeClass('ohov')
    $('.container').addClass('enable').delay(1500).queue((next) => {
      $('.container').removeClass('enable')
      next()
    })
  } else if (localLines.some(line => line.every(cell => cell === 'o'))) {
    if (ultron === true) {
      $('h2').html('Ultron finds you obsolete')
      $('#ultron').show()
      $('#ultron').delay(1000).fadeOut(2000)
    } else {
      $('h2').html('O wins!')
    }
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
    $('#anim').addClass('enable')
    $('.box').removeClass('xhov')
    $('.box').removeClass('ohov')
  } else if (moveArr.length === 9) {
    $('h2').html('Cats!')
    $('#cat').delay(500).fadeIn(2000)
    $('.moveMessage').html('')
    gameData.game.over = true
    finalMove()
    $('#anim').addClass('enable')
    $('.box').removeClass('ohov')
  }
}
// fillContent is triggered by clicking a square. It checks if the game is over, if the square is already clicked, and whose turn it is, assigning player 'o' or 'x'.
const fillContent = function () {
  if (gameData.game.over === true) {
    $('.borg').html('Resistance is futile!')
    $('.borg').addClass('enable').delay(1500).queue((next) => {
      $('.borg').removeClass('enable')
      next()
    })
    if (comp === true) {
      if ($('h2').html() === 'O wins!') {
        $('#locutus').show()
      } else if ($('h2').html() === 'X wins!') {
        $('.borg').html('You already won!')
      }
    }
    return
  } else if ($(event.target).html() !== '') {
    $('.moveMessage').html('Choose an empty Square!')
    $('.moveMessage').addClass('enable').delay(1500).queue((next) => {
      $('.moveMessage').removeClass('enable')
      next()
    })
    return
  } else if (comp === true) {
    const player = 'x'
    move(player)
  } else if ((moveArr.length % 2 !== 0) && (gameData.game.over === false)) {
    $('.box').removeClass('ohov')
    $('.box').addClass('xhov')
    const player = 'o'
    $('.moveMessage').html(`It's X's turn`)
    move(player)
  } else if ((moveArr.length % 2 === 0) && (gameData.game.over === false)) {
    $('.box').removeClass('xhov')
    $('.box').addClass('ohov')
    const player = 'x'
    $('.moveMessage').html(`It's O's turn`)
    move(player)
  }
  checkForWin()
}
// emptyContent is triggered by the newGame button and removes messages and contents of game board. It also triggers newGame,
// posting a new game to the api.
const emptyContent = function () {
  $('.board').removeClass('disappear')
  $('.box').html('')
  $('.box').removeClass('x')
  $('.box').removeClass('o')
  $('.box').addClass('xhov')
  $('.info').html('')
  moveArr = []
  gameData.game.over = false
  newGame()
  $('#message').html('')
  $('#signed-in').html('')
  $('img').hide()
  xWins = 0
  oWins = 0
  store.GamesArray = []
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
  selfMode,
  ultronMode,
  checkAllWins,
  xWins,
  oWins
}
