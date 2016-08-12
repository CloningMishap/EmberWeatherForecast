import { moduleFor, test } from 'ember-qunit';
//import wait from 'ember-test-helpers/wait';

moduleFor('route:forecast', 'Unit | Route | forecast', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:apiUtility', 'service:errors']
});

test('it exists', function(assert) {
  let route = this.subject();

  route.send('model', {forecast_coords: 'testcoords'});

 /* return route.model({forecast_coords: 'testcoords'}).then(function(response) {
    console.log(response);
    assert.equal(response.coordStr, 'test');
  });*/

  //route.send('model');

  return wait()
    .then(() => {
      // assertions for after async behavior
      assert.equal(route.get('searching'), false, 'searching flag should be set to false');
      assert.equal(route.get('foundLatLong'), true, 'foundLatLong flag should be set to true');
      assert.equal(route.get('testTargetRoute'), 'forecast.current', 'route did not change');
      assert.notEqual(route.get('testLatLongStr'),
        undefined, 'latitude and longitude were not included on route');
      assert.ok(route);
    });

  //assert.ok(route);
});
