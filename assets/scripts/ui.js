'use strict'

const store = require('./store')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('signUpSuccess ran. Data is :', data)
  $('#sign-up').addClass('disappear')
}

const signUpFailure = function (error) {
  $('#message').text('Error on sign up')
  $('#message').removeClass()
  $('#message').addClass('failure')
  console.error('signUpFailure ran. Error is :', error)
}

const signInSuccess = function (data) {
  $('.info').html('')
  $('#message').text('Signed in successfully')
  $('#message').removeClass()
  console.log('signInSuccess ran. Data is :', data)
  store.user = data.user
  // $('#sign-up').addClass('.disappear')
  // $('#sign-in').addClass('.disappear')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.changePw').removeClass('disappear')
  $('#sign-out').removeClass()
  $('.newGame').removeClass('disappear')
  $('#sign-out').show()
  $('#change-password').show()
  $('h4').hide()
  $('.info').removeClass('disappear')
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
  $('#sign-out').hide()
  $('#change-password').hide()
  $('.board').addClass('disappear')
  $('.newGame').addClass('disappear')
  $('.info').addClass('disappear')
  $('h4').show()
  $('.changePw').addClass('disappear')
  $('#sign-up').removeClass('disappear')
  store.user = null
}

const signOutFailure = function (error) {
  $('#message').text('Error on sign out')
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('#change-password').trigger('reset')
  console.error('signOutFailure ran. Error is :', error)
}

const onChangePwButton = function () {
  $('.onChangePassword').html('')
  $('.onChangePassword').removeClass('failure')
}

const changePasswordSuccess = function () {
  $('.onChangePassword').removeClass('failure')
  $('.onChangePassword').html('Changed password successfully')
  $('#change-password').trigger('reset')
  // $('.change-password')[0].reset()
  // $('#message').removeClass()
  // $('#message').addClass('success')
  // console.log('changePasswordSuccess ran and nothing was returned!')
}

const changePasswordFailure = function (error) {
  $('.onChangePassword').addClass('failure')
  $('.onChangePassword').html('Failed to change password')
  $('#change-password').trigger('reset')
  // $('#message').removeClass()
  console.error('changePasswordFailure ran. Error is :', error)
}
const onStartGameSuccess = function (responseData) {
  store.id = responseData.game.id
  // alert(store.id)
}

const onStartGameFailure = function () {
  $('.moveMessage').html('Error')
}

let worthlessNumber = 0
const onPatchGameDataSuccess = function () {
  worthlessNumber++
}

const onPatchGameDataFailure = function () {
  $('.moveMessage').html('Error')
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
  onPatchGameDataFailure,
  onChangePwButton
}
