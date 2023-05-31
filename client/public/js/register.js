function validateForm(event) {
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('passwordConfirm').value;
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    event.preventDefault();
  }
}
