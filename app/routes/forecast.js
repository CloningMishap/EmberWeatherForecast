import Ember from 'ember';

export default Ember.Route.extend({

  apiUtility: Ember.inject.service(),
  errorService: Ember.inject.service('errors'),

  model: function(params) {

    var self = this;

    var latLongStr = params.forecast_coords;
    var forecastIoUrl = this.get('apiUtility').forecastIoAPI.getForecastIoUrl(latLongStr);

    // Fetch forecast. Use 'jsonp' dataType to prevent cross-site scripting error.
    return Ember.$.get({url: forecastIoUrl, dataType: 'jsonp'}).then(
      function(response) {

        return {
          coordStr: latLongStr,
          forecastIo: response, // model contains both current and minute-to-minute forecast
          hasCurrent: response.currently !== undefined,
          hasMinute: response.minutely !== undefined,
          staticMapURL: self.get('apiUtility').googleMapsAPI.getStaticMapUrl(latLongStr)
        };
      },
      function() {
        self.get('errorService').set('hasError', true);
        self.get('errorService').set('errorText', 'An error occurred while retrieving the forecast. Please try again.');
        return {};
      }
    );

  }



  //https://maps.googleapis.com/maps/api/staticmap?parameters
});
