const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json',(error, response, body)	=>{

    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const ip = JSON.parse(body).ip;
      callback(error,ip);
    }
  });
};


const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error,response,body)=>{
    
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const latitude = JSON.parse(body).latitude;
      const longitude = JSON.parse(body).longitude;
      const data = {latitude: latitude, longitude: longitude};
      
      callback(error,data);
    }
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response,body)=>{
    
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Pass Data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      
      const data = JSON.parse(body).response;
      
      callback(error,data);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error,null);
      return;
    }

    fetchCoordsByIP(ip, (error,data) => {
      if (error) {
        callback(error,null);
        return;
      }

      fetchISSFlyOverTimes(data, (error,data) => {
        if (error) {
          callback(error, null);
          return;
        }
      
        callback(error,data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };