'use strict'

const store = require('./store')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('signUpSuccess ran. Data is :', data)
  $('#sign-up').html('')
}

const signUpFailure = function (error) {
  $('#message').text('Error on sign up')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('signUpFailure ran. Error is :', error)
}

const signInSuccess = function (data) {
  $('#message').text('Signed in successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('signInSuccess ran. Data is :', data)
  store.user = data.user
  // $('#sign-up').addClass('.disappear')
  // $('#sign-in').addClass('.disappear')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').removeClass()
  $('#sign-out').removeClass()
}

const signInFailure = function (error) {
  $('#message').text('Error on sign in')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('signInFailure ran. Error is :', error)
}

const signOutSuccess = function () {
  $('#message').text('Signed out successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
  console.log('signOutSuccess ran and nothing was returned!')
  $('#sign-up').show()
  $('#sign-in').show()
  store.user = null
}

const signOutFailure = function (error) {
  $('#message').text('Error on sign out')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('signOutFailure ran. Error is :', error)
}

const changePasswordSuccess = function () {
  $('#message').text('Changed password successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('changePasswordSuccess ran and nothing was returned!')
}

const changePasswordFailure = function (error) {
  $('#message').text('Error on change password')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('changePasswordFailure ran. Error is :', error)
}
const onStartGameSuccess = function (responseData) {
  store.id = responseData.game.id
  // alert(store.id)
}

const onStartGameFailure = function () {
  $('.moveMessage').html('Error')
}

const onPatchGameDataSuccess = function () {
  $('.moveMessage').html('Nice Move!')
}

const onPatchGameDataFailure = function () {
  $('.moveMessage').html('Error!')
}
const onIndexSuccess = function (responseData) {
  console.log(responseData)
  // store.games.id = responseData.games.length
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
  onPatchGameDataSuccess,
  onPatchGameDataFailure
}
