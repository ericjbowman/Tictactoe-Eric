'use strict'
const events = require('./events.js')
const ui = require('./ui.js')
const store = require('./store.js')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.box').on('click', events.fillContent)
  $('.newGame').on('click', events.emptyContent)
  events.addHandlers()
  $('.changePw').on('click', ui.onChangePwButton)
  $('.vsSelf').on('click', events.selfMode)
  $('.vsComp').on('click', events.compMode)
  $('.vsUltron').on('click', events.ultronMode)
})
