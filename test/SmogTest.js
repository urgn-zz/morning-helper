const Smogger = require('../apis/Smogger');
const myPos = { lat: 50.083967, long: 19.899659 };
  

let smog = new Smogger();

smog.getSmogReportForMyCoordinates(myPos).then((res) => {
    console.log(res);
});