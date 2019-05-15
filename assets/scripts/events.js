'use strict'
// const zero = $('.zero')
const moveArr = []
const checkForWin = function () {
  if ($('.zero').html() === $('one').html() && $('one').html() === $('.two').html()) {
    alert('you win!')
  }
}
const fillContent = function() {
  if (moveArr.length === 9) {
    return
  } else if (moveArr.length % 2 !== 0) {
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
    columnTwo: [$('.one').html(), $('.four').html(), $('.five').html()],
    columnThree: [$('.two').html(), $('.five').html(), $('.six').html()]
  }
  if (lines.rowOne.every(i => i === 'X') || lines.rowTwo.every(i => i === 'X') || lines.rowThree.every(i => i === 'X') || lines.columnOne.every(i => i === 'X') || lines.columnTwo.every(i => i === 'X') || lines.columnThree.every(i => i === 'X')) {
    alert('X Wins!')
  } else if (lines.rowOne.every(i => i === 'O') || lines.rowTwo.every(i => i === 'O') || lines.rowThree.every(i => i === 'O') || lines.columnOne.every(i => i === 'O') || lines.columnTwo.every(i => i === 'O') || lines.columnThree.every(i => i === 'O')) {
    alert('O Wins!')
  }
  console.log(lines)
  checkForWin()
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
  checkForWin
}
