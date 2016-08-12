import { formatUnixTime } from 'dex-com-weather/helpers/format-unix-time';
import { module, test } from 'qunit';

module('Unit | Helper | format unix time');

test('format valid unix time', function(assert) {
  let result = formatUnixTime([1470951619, 'ddd, hA']);
  assert.equal(result, 'Thu, 2PM', 'valid unit time improperly formatted with specified format');
});

test('format valid unix time with no format', function(assert) {
  let result = formatUnixTime([1470951619]);
  assert.equal(result, '2016-08-11T14:40:19-07:00', 'valid unit time improperly formatted with default format');
});

test('format invalid unix time with no format', function(assert) {
  let result = formatUnixTime(['XXXXX']);
  assert.equal(result, '', 'invalid unit time should result in an empty string');
});

test('format valid unix time with invalid format', function(assert) {
  let result = formatUnixTime([1470951619, '123456']);
  assert.equal(result, '123456',
    'invalid format with no date matchers results in the output of the format string with nothing replaced');
});
