'use strict'

const store = require('./store')
const events = require('./events')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()
  $('form').trigger('reset')
  $('#sign-up').hide()
}

const signUpFailure = function () {
  $('#message').text('Error on sign up')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  $('#message').html('')
  $('.info').html('')
  $('#message').removeClass()
  store.user = data.user
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.changePw').removeClass('disappear')
  $('#sign-out').removeClass()
  $('.newGame').removeClass('disappear')
  $('#sign-out').show()
  $('#change-password').show()
  $('h4').hide()
  $('.info').removeClass('disappear')
  $('#sign-up').addClass('disappear')
  $('form').trigger('reset')
  $('#signed-in').html('Signed in!')
}

const signInFailure = function () {
  $('#message').text('Error on sign in')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const signOutSuccess = function () {
  $('#message').text('Signed out successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('.board').addClass('disappear')
  $('.newGame').addClass('disappear')
  $('.info').addClass('disappear')
  $('h4').show()
  $('.changePw').addClass('disappear')
  $('#sign-up').removeClass('disappear')
  $('.chooseOpBut').addClass('disappear')
  $('#signed-in').html('')
  store.user = null
}

const signOutFailure = function () {
  $('#message').text('Error on sign out')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('#change-password').trigger('reset')
}

const onChangePwButton = function (event) {
  event.preventDefault()
  $('.onChangePassword').html('')
  $('.onChangePassword').removeClass('failure')
}

const changePasswordSuccess = function () {
  $('.onChangePassword').removeClass('failure')
  $('.onChangePassword').html('Changed password successfully')
  $('.onChangePassword').ready(function () {
    $('.onChangePassword').fadeIn('slow', function () {
      $('.onChangePassword').delay(2000).fadeOut()
    })
  })
  $('.onChangePassword').show()
  $('.onChangePassword').html()
  $('#change-password').trigger('reset')
  $('#signed-in').html('')
}

const changePasswordFailure = function () {
  $('.onChangePassword').show()
  $('.onChangePassword').addClass('failure')
  $('.onChangePassword').html('Failed to change password')
  $('#change-password').trigger('reset')
  $('.onChangePassword').ready(function () {
    $('.onChangePassword').fadeIn('slow', function () {
      $('.onChangePassword').delay(2000).fadeOut()
    })
  })
  $('.onChangePassword').show()
  $('.onChangePassword').html()
  $('#change-password').trigger('reset')
  $('#signed-in').html('')
}

const onStartGameSuccess = function (responseData) {
  store.id = responseData.game.id
  $('.chooseOpBut').removeClass('disappear')
  $('#signed-in').html('')
}

const onIndexSuccess = function (responseData) {
  $('.gamesPlayed').html(`Games played: ${responseData.games.length}`)
  responseData.games.forEach(game => store.GamesArray.push(game.cells))
  console.log('Index = ', responseData)
}

const onPatchGameDataSuccess = function (responseData) {
  console.log('Patch = ', responseData)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  onIndexSuccess,
  onPatchGameDataSuccess,
  onStartGameSuccess,
  onChangePwButton
}
