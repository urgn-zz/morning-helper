// God bless stackoverflow.com
const Utils = {

	degreesToRadians: function (degrees) {
		return degrees * Math.PI / 180;
	},

	distanceInKmBetweenEarthCoordinates: function (lat1, lon1, lat2, lon2) {
	  var earthRadiusKm = 6371;

	  var dLat = Utils.degreesToRadians(lat2-lat1);
	  var dLon = Utils.degreesToRadians(lon2-lon1);

	  lat1 = Utils.degreesToRadians(lat1);
	  lat2 = Utils.degreesToRadians(lat2);

	  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

	  return earthRadiusKm * c;
	}

}

module.exports = Utils;
