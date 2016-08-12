import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('forecast', { path: 'forecast/:forecast_coords' }, function() {
    this.route('current');
    this.route('minutes');
  });
  this.route('noMatch', { path: "*path"});
});

export default Router;
