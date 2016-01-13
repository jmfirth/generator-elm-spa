'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var spawn = require('child_process').execSync;
var appFolder = 'app';

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', { type: String, required: false });
    this.appName = this.name || path.basename(process.cwd()) || 'elm-spa';
    this.appName = this.appName.replace(/\s+/g, '-').toLowerCase();
    this.appPath = this.env.options.appPath;
    this.argument('description', {type: String, required: false});
    this.appDescription = this.description || 'test';
    this.private = true;
    this.version = "0.0.1";
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the \n' + chalk.red('Elm SPA Generator')
    ));

    var prompts = [{
      name: 'appName',
      message: 'What do you want to name your app?',
      default: 'elm-spa',
      store: true
    }, {
      name: 'appDescription',
      message: 'Give me a short description of your app:',
      default: '',
      store: true
    }, {
      type: "confirm",
      name: "private",
      message: "Do you want this app to be private?",
      default: true,
      store: true
    }];

    var self = this;
    this.prompt(prompts, function (props) {
      this.answers = props;
      self.appName = this.answers.appName;
      self.appDescription = this.answers.appDescription;
      self.private = this.answers.private;

      self.ProperAppName = self.appName.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})
      self.camelAppName = self.appName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '').replace(/-/g, '')
      self.hyphenAppName = self.appName.replace(/\s+/g, '-').toLowerCase();
      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      var appFilesArray = [
        {src:'src/**', dest:'src'}
      ];
      this.copyFiles(appFilesArray);
    },
    projectfiles: function () {
      var projectFilesArray = [
        {src:'_package.json', dest: 'package.json'},
        {src:'_elm-package.json', dest: 'elm-package.json'},
        {src:'_Gulpfile.js', dest: 'Gulpfile.js'},
        {src:'_README.md', dest: 'README.md'},
        {src:'_.gitignore', dest: '.gitignore'},
        {src:'_.babel.rc', dest: '.babelrc'}
      ]
      this.copyFiles(projectFilesArray);
    }
  },
  install: function () {
    this.log(yosay('Installing Dependencies'))

    var o = null

    this.log(chalk.green('Installing npm dependencies...\n'))
    o = spawn('npm install')
    this.log(o.toString('utf8'))

    this.log(chalk.green('Installing Elm dependencies...\n'))
    o = spawn('elm-package install -y')
    this.log(o.toString('utf8'))

    this.log(chalk.green('Building project...\n'))
    o = spawn('gulp build')
    this.log(o.toString('utf8'))
  },
  /**
   * @param {Array|Object} filesArray
   */
  copyFiles: function(filesArray){
    var array = [];
    if(_.isArray(filesArray)){
      array = filesArray;
    } else { //Handle array of arguments if first argument is not array
      array = arguments;
    }
    for(var i=0; i < array.length; i++){
      var src = '';
      var destination = '';
      if (!_.has(array[i],'src')) {
        if (_.isString(array[i])) {
          src = array[i];
        } else {
          console.error('Invalid source for file copying.');
          throw new Error('Invalid source for file copy.');
        }
      }
      if(_.isObject(array[i])){
        src = array[i].src;
        destination = array[i].dest || array[i].src; //Make destination source if not provided
      }
      if(src.charAt(0) === "_"){ //template if filename starts with _
        //Copy with templating
        this.template(src, destination, this.templateContext);
      } else if(src.indexOf('*') !== -1 || src.indexOf('/**') !== -1) {
        //TODO: make this work better (work with nested folders and use src correctly)
        src.replace("**", ""); //Remove /**
        src.replace("/", ""); //Remove /
        this.directory(destination, destination);
      } else {
        //Normal copy
        this.fs.copy(
          this.templatePath(src),
          this.destinationPath(destination)
        );
      }
    }
  },
});
