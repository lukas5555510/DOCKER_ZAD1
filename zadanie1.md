# zadanie1.md


Plik index.js z dodatkowymi komentarzami:

const http = require('http');
const clientIp = require('request-ip');
const moment = require('moment-timezone');
var satelize = require('satelize');
// Ustawienie portu na którym serwer będzie nasłuchiwał
const PORT = 8000;

// Funkcja obsługująca żądania klienta
const handleRequest = (req, res) => {
  const ip = clientIp.getClientIp(req).match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/)[0]; //pobieranie adresu ip oraz przyciecie
  //console.log(ip);
  var timezone;
  satelize.satelize({ip:ip}, function(err, payload) { //okreslenie strefy czasowej na podstawie ip
try{
  timezone = payload.timezone; //wyluskanie strefy czasowej z payloadu
}catch(error)
{
  timezone = "Europe/Amsterdam"; //jesli nie da sie odczytac strefy czasowej z ip przypisuje domyslna
}
});
  const clientTime = moment.tz(new Date(), timezone); //obliczenie godziny w wyluskanej wczesniej strefy czasowej
  //const ip = req.socket.remoteAddress;
  console.log(`Połączenie przychodzące z ip:${ip} , ${clientTime}`); // wypisanie w logach ip przychodzacego polaczenia i godziny
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`IP: ${ip}\n`); //wypisanie na stronie ip
  res.write(`Data: ${clientTime}`); //wypisanie na stronie dany i godziny
  res.end();
}

// Utworzenie serwera i nasłuchiwanie na połączenia
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`Łukasz Kałuszyński server nasłuchuje na porcie:${PORT}.`); // wypisanie w logach portu i autora
});

