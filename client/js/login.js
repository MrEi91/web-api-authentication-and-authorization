$('#loginForm').submit(function(e) {
  e.preventDefault()
  $.ajax({
    url: 'http://localhost:3000/api/user/login',
    type: 'POST',
    data: $(this).serialize(),
    success: function(user) {
      if (user) {
        if (user.userUndefined) {
          swal('Oops...', 'user is not found!', 'warning')
        }
        if (user.wrongPassword) {
          swal('Oops...', 'Password wrong!', 'warning')
        }
        if (user.token) {
          localStorage.setItem('token', user.token)
          window.location.href = 'http://127.0.0.1:8080/home.html'
        }
      }
    },
    error: function(error) {
      console.log(erorr)
    }
  })
})

function register() {
  $.ajax({
    url: 'http://localhost:3000/api/user',
    type: 'POST',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    },
    success: function(user) {
      window.location.href = 'http://127.0.0.1:8080/index.html'
    },
    error: function(err) {
      console.log(err)
    }
  })
}
