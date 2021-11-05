const { nextISSTimesForMyLocation } = require('./iss_promised');


const readableEvents = function(times) {

  for (let event of times) {
    const date = new Date(0);
    date.setUTCSeconds(event.risetime);
    let seconds = event.duration;
    console.log(`Next pass at ${date} for ${seconds} seconds!`);
  }

};

nextISSTimesForMyLocation()
  .then(readableEvents)
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

//readableEvents(nextISSTimesForMyLocation())

  