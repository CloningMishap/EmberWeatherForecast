import Ember from 'ember';

export default Ember.Service.extend({
  googleMapsAPI: {
    key: 'AIzaSyBYH6Eqv14FSf_X8fdnH41lI3kN3r-S49Q',
    rootUrl: 'https://maps.googleapis.com/maps/api',
    getStaticMapUrl: function(latLongStr) {
      return 'https://maps.googleapis.com/maps/api/staticmap?center=' +
        latLongStr + '&zoom=10&size=100x100&key=AIzaSyBYH6Eqv14FSf_X8fdnH41lI3kN3r-S49Q';
    },
    getGeocodingUrl: function(address) {
      return 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        encodeURIComponent(address) + '&key=AIzaSyBYH6Eqv14FSf_X8fdnH41lI3kN3r-S49Q';
    }
  },
  forecastIoAPI: {
    key: 'b4bdb0e0f98e381328256ed9219a1f95',
    rootUrl: 'https://api.forecast.io/forecast',
    getForecastIoUrl: function(latLongStr) {
      return 'https://api.forecast.io/forecast/b4bdb0e0f98e381328256ed9219a1f95/' + latLongStr;
    }
  }
});
