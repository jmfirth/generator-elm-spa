var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var path = require('path')
var Promise = require('promise')
var atImport = require('postcss-import')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


var compilers = []

var modules = [
    {
      name: 'Native.Hello',
      watch: ['./src/js/hello/**/*.js'],
      entry: ['./src/js/hello/index'],
      output: createWebpackOutput('/src/elm/native/Native/', 'Hello.js', '/src/elm/native/Native/'),
      loaders: createWebpackJsLoaders('./src/js/hello/')
    },
    {
      name: 'PostCSS',
      watch: ['./src/pcss/**/*.pcss'],
      entry: ['./src/pcss/main.pcss'],
      output: createWebpackOutput('/dist/', 'main.css', '/'),
      loaders: createWebpackCssLoaders('./src/pcss/')
    }
]

function createWebpackOutput(relativePath, filename, publicPath) {
  return {
    path: path.join(__dirname, relativePath),
    filename: filename,
    publicPath: publicPath
  }
}

function createWebpackLoader(test, loaders, loader, include, exclude) {
  return {
    test: test,
    loaders: loaders,
    loader: loader,
    include: include,
    exclude: exclude
  }
}

function createWebpackJsLoaders(relativePath) {
  return [
    createWebpackLoader(
      /\.js|\.es6$/,
      ['babel'],
      null,
      path.join(__dirname, relativePath))
  ]
}

function createWebpackCssLoaders(relativePath) {
  return [
    createWebpackLoader(
      /\.pcss$/,
      null,
      ExtractTextPlugin.extract('css-loader!postcss-loader'),
      path.join(__dirname, relativePath))
  ]
}

function createWebpackDevConfig(entry, output, loaders) {
  return {
    devtool: 'eval',
    entry: entry,
    output: output,
    plugins: [
      new ExtractTextPlugin('[name].css', { allChunks: true }),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: loaders
    },
    postcss: function (webpack) {
      return [
        require('postcss-import')({ addDependencyTo: webpack }),
        require('postcss-url')(),
        require('postcss-cssnext')(),
        // add your 'plugins' here
        // ...
        // and if you want to compress,
        // just use css-loader option that already use cssnano under the hood
        require('postcss-browser-reporter')(),
        require('postcss-reporter')(),
      ]
    },
    debug: true
  }
}

function createWebpackConfig(entry, output, plugins, loaders) {
  return {
    entry: entry,
    output: output,
    plugins: plugins,
    module: {
      loaders: loaders
    }
  }
}

function runCommand(cmd, cb) {
  var spawn = require('child_process').exec;
  var child = spawn(cmd);
  var stderrMessage = stdoutMessage = ''

  child.on('error', (err) => cb(err))
  child.stderr.on('data', buf => stderrMessage += buf.toString())
  child.stderr.on('end', () => cb(null, stderrMessage))
  child.stdout.on('data', buf => stdoutMessage += buf.toString())
  child.stdout.on('end', () => cb(null, null, stdoutMessage))
};

function formatMessage(msg) {
  return msg.split('\n').map(s => '  ' + s).join('\n');
}



var taskNames = []

function createTaskName(moduleName) { return 'webpack:build -> ' + moduleName }

// Build dev tasks
modules.reduce(function(previous, module) {
  return previous.then(function() {
    var taskName = createTaskName(module.name)
    taskNames.push(taskName)
    gulp.task(taskName, function(cb) {
      var config = createWebpackDevConfig(module.entry, module.output, module.loaders)
      var compiler = webpack(config)
      compiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError(taskName, err)
        gutil.log(taskName, stats.toString({ colors: true }))
        cb()
      })
      compilers.push(compiler)
    })
  })
}, Promise.resolve())
  .then(function() { callback() })

gulp.task('webpack', taskNames)

gulp.task('html', function() {
  return gulp.src('src/html/index.html')
    .pipe(gulp.dest('dist/'))
})

gulp.task('elm', ['webpack'], function(callback) {
  var cmd = 'elm-make --yes src/elm/spa/App/App.elm --output=./dist/app.js'
  runCommand(cmd,(err, stderr, stdout) => {
    if (err) {
      console.log(' Error', err.stack)
    }
    if (stderr) {
      console.log(' Fail')
      console.log(formatMessage(stderr))
    }
    if (stdout) {
      console.log(' Built')
      console.log(formatMessage(stdout))
      callback()
    }
  })
})

// Prod build task
gulp.task('build', ['elm', 'html'], function(callback) { callback() })

// Dev watch task
gulp.task('watch', ['build'], function(callback) {
modules.reduce(function(previous, module) {
  return previous.then(function() {
    var taskName = createTaskName(module.name)
    return gulp.watch(module.watch, [taskName], [taskName])
  })
}, Promise.resolve())
  .then(function() { callback() })
})
