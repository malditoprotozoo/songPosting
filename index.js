var request = require("request")
var mail = 'your-mail@example.com'
var dni = '000000000'
var webLogin = 'http://www.example.com/index.php/inicio/login'
var webSong = 'http://www.example.com/index.php/inicio/song'
var songs = ['Baby - Clean Bandit', 'Let it Go - Idina Menzel', 'Get Back Up Again - Anna Kendrick']

function login(mail, dni) {
  var options = {method: 'POST',
  url: webLogin,
  headers:
    {
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
  formData: {email: mail, rut: dni} };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    var cookie = response.headers['set-cookie'][0]
    for(var i = 0; i < songs.length; i++) {
      sendSong(songs[i], cookie)
    }
  })
}

function sendSong(song, cookies) {
  var options = { method: 'POST',
  url: webSong,
  headers:
    {'cache-control': 'no-cache',
    'Cookie': cookies,
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    formData: { pedido: song } };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      console.log(body)
    })
}

login(mail, dni)