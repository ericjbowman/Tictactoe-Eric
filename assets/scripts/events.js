'use strict'
// const zero = $('.zero')
let moveArr = []
const checkForWin = function () {
  if ($('.zero').html() === $('one').html() && $('one').html() === $('.two').html()) {
    alert('you win!')
  }
}
const fillContent = function() {
    if (moveArr.length % 2 !== 0) {
    $(event.target).html("O")
    moveArr.push('O')
  } else if (moveArr.length % 2 === 0) {
    $(event.target).html('X')
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
    $('h2').html('X Wins')
  } else if (lines.rowOne.every(i => i === 'O') || lines.rowTwo.every(i => i === 'O') || lines.rowThree.every(i => i === 'O') || lines.columnOne.every(i => i === 'O') || lines.columnTwo.every(i => i === 'O') || lines.columnThree.every(i => i === 'O') || lines.diagOne.every(i => i === 'O') || lines.diagTwo.every(i => i === 'O')) {
    $('h2').html('O Wins')
  } else if (moveArr.length === 9) {
    $('h2').html('Cats!')
  }
  checkForWin()
}

const emptyContent = function () {
  $('.box').html('')
  $('h2').html('')
  moveArr = []
}

// const eventChain = {
//   fillContent: function() {
//     if (moveArr.length === 9) {
//       return
//     } else if (moveArr.length % 2 !== 0) {
//       $(event.target).html("O")
//       moveArr.push('O')
//     } else if (moveArr.length % 2 === 0) {
//       $(event.target).html('X')
//       moveArr.push('X')
//       console.log(moveArr)
//     }
//   },
//   checkForWin: function () {
//     if (moveArr[0] === movArr[1] && moveArr[1] === moveArr[3]) {
//       alert('you win!')
//     }
//   }
// }

module.exports = {
  fillContent,
  checkForWin,
  emptyContent
}
