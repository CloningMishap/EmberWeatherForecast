import { moduleFor, test } from 'ember-qunit';

moduleFor('service:errors', 'Unit | Service | errors', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('hasError property', function(assert) {
  let service = this.subject();
  assert.equal(service.hasError, false, 'error service hasError should have an initial value of false');

  service.set('hasError', true);
  assert.equal(service.hasError, true, 'error service hasError could not be set to true');
});

test('errorText property', function(assert) {
  let service = this.subject();
  assert.equal(service.errorText, '', 'error service errorText should have an initial value of empty string');

  service.set('errorText', 'error text');
  assert.equal(service.errorText, 'error text', 'error service errorText could not be set');
});
