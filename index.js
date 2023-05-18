const http = require('http');
const clientIp = require('request-ip');
const moment = require('moment-timezone');
var satelize = require('satelize');
// Ustawienie portu na którym serwer będzie nasłuchiwał
const PORT = 8000;

// Funkcja obsługująca żądania klienta
const handleRequest = (req, res) => {
  const ip = clientIp.getClientIp(req).match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/)[0];
  //console.log(ip);
  var timezone;
  satelize.satelize({ip:ip}, function(err, payload) {
try{
  timezone = payload.timezone;
}catch(error)
{
  timezone = "Europe/Amsterdam";
}
});
  const clientTime = moment.tz(new Date(), timezone);
  //const ip = req.socket.remoteAddress;
  console.log(`Połączenie przychodzące z ip:${ip} , ${clientTime}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`IP: ${ip}\n`);
  res.write(`Data: ${clientTime}`);
  res.end();
}

// Utworzenie serwera i nasłuchiwanie na połączenia
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`Łukasz Kałuszyński server nasłuchuje na porcie:${PORT}.`);
});
