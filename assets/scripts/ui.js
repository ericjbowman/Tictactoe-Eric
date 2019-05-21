'use strict'

const store = require('./store')

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
  $('.info').html('')
  $('#message').text('Signed in successfully')
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
  $('s-in').html('Signed in successfully baby')
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
  $('.onChangePassword').ready(function() {
    $('.onChangePassword').fadeIn('slow', function() {
      $('.onChangePassword').delay(2000).fadeOut()
    })
  })
  $('.onChangePassword').show()
  $('.onChangePassword').html()
  $('#change-password').trigger('reset')
}

const changePasswordFailure = function () {
  $('.onChangePassword').show()
  $('.onChangePassword').addClass('failure')
  $('.onChangePassword').html('Failed to change password')
  $('#change-password').trigger('reset')
  $('.onChangePassword').ready(function() {
    $('.onChangePassword').fadeIn('slow', function() {
      $('.onChangePassword').delay(2000).fadeOut()
    })
  })
  $('.onChangePassword').show()
  $('.onChangePassword').html()
  $('#change-password').trigger('reset')
}
const onStartGameSuccess = function (responseData) {
  store.id = responseData.game.id
  $('.chooseOpBut').removeClass('disappear')
}

const onStartGameFailure = function () {
  $('.moveMessage').html('Error')
}

const onPatchGameDataFailure = function () {
  $('.moveMessage').html('Error')
}

const onIndexSuccess = function (responseData) {
  $('.gamesPlayed').html(`Games played: ${responseData.games.length}`)
}

const onIndexFailure = function () {
  $('.moveMessage').html('Error!')
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
  onIndexFailure,
  onStartGameSuccess,
  onStartGameFailure,
  onPatchGameDataFailure,
  onChangePwButton
}
