const {  nextISSTimesForMyLocation } = require('./iss');



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  readableEvents(passTimes);
});

const readableEvents = function(times) {

  for (let event of times) {
    const date = new Date(0);
    date.setUTCSeconds(event.risetime);
    let seconds = event.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`);
  }

};