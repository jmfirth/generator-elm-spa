'use strict';

var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.camelName = this.name.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
    this.ProperName = this.name.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})
    this.hyphenName = this.camelName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  },
  writing: function () {
    this.template('_actions.elm', 'src/elm/spa/App/Views/' + this.ProperName + '/actions.elm')
    this.template('_models.elm', 'src/elm/spa/App/Views/' + this.ProperName + '/models.elm')
    this.template('_update.elm', 'src/elm/spa/App/Views/' + this.ProperName + '/update.elm')
    this.template('_view.elm', 'src/elm/spa/App/Views/' + this.ProperName + '/view.elm')
  }
});
