const axios = require("axios");
const _ = require("../lib/Utils");
const EPS = {
	"StationList": "http://api.gios.gov.pl/pjp-api/rest/station/findAll",
	"SensorList": "http://api.gios.gov.pl/pjp-api/rest/station/sensors/",
	"SensorHostory": "http://api.gios.gov.pl/pjp-api/rest/data/getData/",
	"StationData": "http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/"
}

class SmogApi {

	async getAllStations() {
		return axios.get(EPS.StationList);
	}

	async getStationReport( stationId ) {
		return axios.get(EPS.StationData + stationId);
	}
	
	async getSensorList( stationId ) {
		return axios.get(EPS.SensorList + stationId);
	}

	async getSensorData( sensorId ) {
		return axios.get(EPS.StationData + sensorId);
	}

	async getSmogReportForMyCoordinates({lat, long}) {
		return (this.getAllStations().then(
			(resp) => {
				let closestDistance = Infinity;
				let closestStation = null;

				resp.data.forEach(station => {
					const distance = _.distanceInKmBetweenEarthCoordinates(
						station.gegrLat, station.gegrLon, 
						lat, long
					);
				
					if (distance < closestDistance) {
						closestDistance = distance;
						closestStation = station;
					}
				
				});
				
				return this.getStationReport(closestStation.id);
			}).then((station) => {
				return station.data.stIndexLevel;
			}));
	}
}

module.exports = SmogApi;
