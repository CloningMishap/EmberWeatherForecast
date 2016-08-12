import { moduleFor, test } from 'ember-qunit';

moduleFor('service:api-utility', 'Unit | Service | api utility', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('getStaticMapUrl', function(assert) {
  let service = this.subject();
  var result = service.googleMapsAPI.getStaticMapUrl('XXXX');
  assert.equal(result, 'https://maps.googleapis.com/maps/api/staticmap?center=XXXX&zoom=10&size=100x100&key=AIzaSyBYH6Eqv14FSf_X8fdnH41lI3kN3r-S49Q');
});

test('getGeocodingUrl with unencoded address', function(assert) {
  let service = this.subject();
  var result = service.googleMapsAPI.getGeocodingUrl('XXXX XXX');
  assert.equal(result, 'https://maps.googleapis.com/maps/api/geocode/json?address=XXXX%20XXX&key=AIzaSyBYH6Eqv14FSf_X8fdnH41lI3kN3r-S49Q');
});

test('getGeocodingUrl with encoded address', function(assert) {
  let service = this.subject();
  var result = service.googleMapsAPI.getGeocodingUrl('XXXXXXX');
  assert.equal(result, 'https://maps.googleapis.com/maps/api/geocode/json?address=XXXXXXX&key=AIzaSyBYH6Eqv14FSf_X8fdnH41lI3kN3r-S49Q');
});

test('getForecastIoUrl', function(assert) {
  let service = this.subject();
  var result = service.forecastIoAPI.getForecastIoUrl('XXXX');
  assert.equal(result, 'https://api.forecast.io/forecast/b4bdb0e0f98e381328256ed9219a1f95/XXXX');
});
