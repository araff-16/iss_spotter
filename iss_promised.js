const request = require('request-promise-native');

const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ipString) {
  const ip = JSON.parse(ipString).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(coords) {
  const latitude = JSON.parse(coords).latitude;
  const longitude = JSON.parse(coords).longitude;

  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};


const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data=> {
      const response = JSON.parse(data).response;
      return response;
    });

};

module.exports = { nextISSTimesForMyLocation };