import Ember from 'ember';

export function formatUnixTime([value, format]) {
  var formattedTime = moment.unix(value).format(format);
  if (formattedTime === 'Invalid date') {
    formattedTime = '';
  }
  return formattedTime;
}

export default Ember.Helper.helper(formatUnixTime);
