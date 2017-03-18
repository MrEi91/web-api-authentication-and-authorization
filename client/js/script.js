$(document).ready(function () {
  let token = localStorage.getItem('token')
  if (!token) {
    window.location.href = 'http://127.0.0.1:8080/index.html'
  } else {
    $.ajax({
      url: `http://localhost:3000/api/verify/${token}`,
      success: function (user) {
        if (!user.email) {
          window.location.href = 'http://127.0.0:8080/api/index.html'
        }
      }
    })
    getUsers()
  }
})

$('#logout').click(function () {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/index.html'
})

function getUsers () {
  $.ajax({
    url: 'http://localhost:3000/api/users',
    type: 'GET',
    success: function (users) {
      users.forEach(function (user) {
        $('#user').append(`<tr><td>${user.email}</td><td><button class="waves-effect waves-light btn">edit</button>&nbsp;<button class="waves-effect waves-light btn">delete</button></td></tr>`)
      })
    }
  })
}

function addTodo () {
  $.ajax({
    url: 'http://localhost:3000/api/user',
    type: 'POST',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    },
    success: function (user) {},
    error: function (err) {
      console.log(err)
    }
  })
}

function remove (email) {
  $.ajax({
    url: `http://localhost:3000/api/user/${email}`,
    type: 'DELETE',
    success: function (user) {
      $(`#email`).remove()
    }
  })
}
