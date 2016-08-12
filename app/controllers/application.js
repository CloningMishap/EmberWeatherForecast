import Ember from 'ember';

export default Ember.Controller.extend({
  apiUtility: Ember.inject.service(),
  errorService: Ember.inject.service('errors'),

  actions: {
    getLatLongForLocation: function(address) {

      this.initializeSearchFlags(this);

      if(!address ||!address.trim()) {
        return; // Don't search for a blank address
      }

      this.set('searching', true);

      var self = this; // Store controller reference since we lose 'this' access post getJSON

      return Ember.$.getJSON(this.get('apiUtility').googleMapsAPI.getGeocodingUrl(address)).then(
        function(response) {

          self.set('searching', false);

          if (response.results.length === 0) {
            // Location was invalid
            self.showError(self, 'Please enter a valid location.', true);
            return;
          }

          // Location was valid. Extract the coordinates so
          // that we can fetch the forecast.
          self.set('foundLatLong', true);
          var latLong = response.results[0].geometry.location;
          self.transitionToRoute('forecast.current', latLong.lat + ',' + latLong.lng);
        },
        function() {
          self.showError(self, 'An error occurred. Please try again.', false);
          return;
        }
      );
    }
  },

  // Reset search flags
  initializeSearchFlags(thisController) {
    thisController.set('searching', false);
    thisController.set('foundLatLong', false);
    thisController.get('errorService').set('hasError', false);
  },

  // Set flags for error display. Optionally clear search location.
  showError(thisController, errorText, clearSearchLocation) {
    thisController.set('foundLatLong', false);
    thisController.get('errorService').set('hasError', true);
    if(errorText === undefined || errorText.trim() === '') {
      errorText = 'An unknown error has occurred';
    }
    thisController.get('errorService').set('errorText', errorText);
    if (clearSearchLocation) {
      thisController.set('locationToSearch', '');
    }
  }
});
