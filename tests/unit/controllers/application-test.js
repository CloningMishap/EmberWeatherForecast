import { moduleFor, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:errors', 'service:apiUtility']
});

test('initializeSearchFlags sets proper flag state', function(assert) {
  let controller = this.subject();

  // Initialize props to make sure things change
  controller.set('searching', true);
  controller.set('foundLatLong', true);
  controller.get('errorService').set('hasError', true);

  controller.initializeSearchFlags(controller);

  assert.equal(controller.get('searching'), false, 'searching flag should be initialized to false');
  assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be initialized to false');
  assert.equal(controller.get('errorService').get('hasError'), false,
    'error service hasError flag should be initialized to false');
});

test('showError with clearing of location', function(assert) {
  let controller = this.subject();

  // Initialize props to make sure things change
  controller.set('foundLatLong', true);
  controller.get('errorService').set('hasError', false);
  controller.get('errorService').set('errorText', 'Original text');
  controller.set('locationToSearch', 'address');

  controller.showError(controller, 'Error text', true);

  assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be set to false');
  assert.equal(controller.get('errorService').get('hasError'), true,
    'error service hasError flag should be set to true');
  assert.equal(controller.get('errorService').get('errorText'), 'Error text',
    'error service errorText should equal passed-in value');
  assert.equal(controller.get('locationToSearch'), '', 'locationToSearch should be set to empty string');
});

test('showError without clearing of location', function(assert) {
  let controller = this.subject();

  // Initialize props to make sure things change
  controller.set('foundLatLong', true);
  controller.get('errorService').set('hasError', false);
  controller.get('errorService').set('errorText', 'Original text');
  controller.set('locationToSearch', 'address');

  controller.showError(controller, 'Error text', false);

  assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be set to false');
  assert.equal(controller.get('errorService').get('hasError'), true,
    'error service hasError flag should be set to true');
  assert.equal(controller.get('errorService').get('errorText'), 'Error text',
    'error service errorText should equal passed-in value');
  assert.equal(controller.get('locationToSearch'), 'address', 'locationToSearch should not be cleared');
});

test('showError with undefined error text', function(assert) {
  let controller = this.subject();
  controller.set('foundLatLong', true);
  controller.get('errorService').set('hasError', false);
  controller.get('errorService').set('errorText', 'Original text');
  controller.set('locationToSearch', 'address');

  controller.showError(controller, undefined, true);

  assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be set to false');
  assert.equal(controller.get('errorService').get('hasError'), true, 'error service hasError flag should be set to true');
  assert.equal(controller.get('errorService').get('errorText'), 'An unknown error has occurred', 'error service errorText should equal default value');
  assert.equal(controller.get('locationToSearch'), '', 'locationToSearch should be set to empty string');
});

test('showError with empty error text', function(assert) {
  let controller = this.subject();
  controller.set('foundLatLong', true);
  controller.get('errorService').set('hasError', false);
  controller.get('errorService').set('errorText', 'Original text');
  controller.set('locationToSearch', 'address');

  controller.showError(controller, '', true);

  assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be set to false');
  assert.equal(controller.get('errorService').get('hasError'), true, 'error service hasError flag should be set to true');
  assert.equal(controller.get('errorService').get('errorText'), 'An unknown error has occurred', 'error service errorText should equal default value');
  assert.equal(controller.get('locationToSearch'), '', 'locationToSearch should be set to empty string');
});

test('getLatLongForLocation with blank address', function(assert) {
  let controller = this.subject();

  // Override transitionToRoute to catch if a route transition happens
  controller.transitionToRoute = function(targetRoute, latLongStr) {
    controller.set('testTargetRoute', targetRoute);
    controller.set('testLatLongStr', latLongStr);
  };

  controller.send('getLatLongForLocation', '');

  assert.equal(controller.get('searching'), false, 'searching flag should be set to false');
  assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be set to false');
  assert.equal(controller.get('testTargetRoute'), undefined, 'route should not change');
  assert.equal(controller.get('testLatLongStr'), undefined, 'latitude and longitude should not be set');

  assert.ok(controller);
});

test('getLatLongForLocation with valid address: successfully get response and change route', function(assert) {
  let controller = this.subject();

  // Override transitionToRoute to catch if a route transition happens
  controller.transitionToRoute = function(targetRoute, latLongStr) {
    controller.set('testTargetRoute', targetRoute);
    controller.set('testLatLongStr', latLongStr);
  };

  controller.send('getLatLongForLocation', 'tigard, or');

  return wait()
    .then(() => {
      // assertions for after async behavior
      assert.equal(controller.get('searching'), false, 'searching flag should be set to false');
      assert.equal(controller.get('foundLatLong'), true, 'foundLatLong flag should be set to true');
      assert.equal(controller.get('testTargetRoute'), 'forecast.current', 'route did not change');
      assert.notEqual(controller.get('testLatLongStr'),
        undefined, 'latitude and longitude were not included on route');
      assert.ok(controller);
    });
});

test('getLatLongForLocation with invalid address: successfully get response', function(assert) {
  let controller = this.subject();

  // Override transitionToRoute to catch if a route transition happens
  controller.transitionToRoute = function(targetRoute, latLongStr) {
    controller.set('testTargetRoute', targetRoute);
    controller.set('testLatLongStr', latLongStr);
  };

  controller.send('getLatLongForLocation', 'testval');

  return wait()
    .then(() => {
      // assertions for after async behavior
      assert.equal(controller.get('searching'), false, 'searching flag should be set to false');
      assert.equal(controller.get('foundLatLong'), false, 'foundLatLong flag should be set to false');
      assert.equal(controller.get('testTargetRoute'), undefined, 'route should not change');
      assert.equal(controller.get('testLatLongStr'), undefined, 'latitude and longitude should not be set');
      assert.ok(controller);
    });
});

test('getLatLongForLocation with valid address: error response', function(assert) {
  let controller = this.subject();
  // TODO: Figure out how to mock getJSON to resolve with an error
  assert.ok(controller);
});
