var gulp = require('gulp')
var gutil = require('gulp-util')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var livereload = require('gulp-livereload')
var webpack = require('webpack')
var path = require('path')
var Promise = require('promise')
var atImport = require('postcss-import')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var chalk = require('chalk')


var compilers = []

var modules = [
    {
      name: 'Native.Hello',
      watch: ['./src/js/hello/**/*.js'],
      entry: ['./src/js/hello/index'],
      output: createWebpackOutput('/src/elm/native/Native/', 'Hello.js', '/src/elm/native/Native/'),
      loaders: createWebpackJsLoaders('./src/js/hello/'),
      watchActions: ['build:elm']
    },
    {
      name: 'PostCSS',
      watch: ['./src/pcss/**/*.pcss'],
      entry: ['./src/pcss/main.pcss'],
      output: createWebpackOutput('/dist/', 'main.css', '/'),
      loaders: createWebpackCssLoaders('./src/pcss/'),
      watchActions: ['build:webpack']
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
    postcss: (webpack) => {
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
modules.reduce((previous, module) => {
  return previous.then(() => {
    var taskName = createTaskName(module.name)
    taskNames.push(taskName)
    gulp.task(taskName, (cb) => {
      var config = createWebpackDevConfig(module.entry, module.output, module.loaders)
      var compiler = webpack(config)
      compiler.run((err, stats) => {
        if(err) throw new gutil.PluginError(taskName, err)
        gutil.log(taskName, stats.toString({ colors: true }))
        cb()
      })
      compilers.push(compiler)
    })
  })
}, Promise.resolve())
  .then(() => callback())

gulp.task('build:webpack-make', taskNames)

gulp.task('build:webpack-copy', ['build:webpack-make'], () => {
  return gulp.src('dist/main.css')
    .pipe(plumber())
    .pipe(gulp.dest('dev/'))
})

gulp.task('build:webpack', ['build:webpack-make', 'build:webpack-copy'])

gulp.task('build:html-dev', () => {
  return gulp.src('src/html/index.dev.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dev/'))
})

gulp.task('build:html-dist', () => {
  return gulp.src('src/html/index.dist.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('build:html', ['build:html-dev', 'build:html-dist'])

gulp.task('build:elm-make', ['build:webpack'], (callback) => {
  var cmd = 'elm-make --yes src/elm/spa/App/App.elm --output=./dist/app.js'
  runCommand(cmd,(err, stderr, stdout) => {
    var didError = false
    if (stderr) {
      didError = true
      gutil.log(chalk.red('ERROR'), 'thrown by', 'elm-make:')
      gutil.log(formatMessage(stderr))
    }
    if (stdout) {
      var message = stdout.indexOf('error') === -1 ? chalk.green('Succeeded') : chalk.red('Failed')
      gutil.log('elm-make', message)
      callback()
    }
  })
})

gulp.task('build:elm-copy', ['build:elm-make'], () => {
  return gulp.src('dist/app.js')
    .pipe(plumber())
    .pipe(gulp.dest('dev/'))
})

gulp.task('build:elm', ['build:elm-make', 'build:elm-copy'])

gulp.task('watch:html-dist', ['build:html-dist'], () => {
  return gulp.watch('src/html/index.dist.html', ['build:html-dist'])
})

gulp.task('watch:html-dev', ['build:html-dev'], () => {
  return gulp.watch('src/html/index.dev.html', ['build:html-dev'])
})

gulp.task('watch:html', ['watch:html-dist', 'watch:html-dev'])

gulp.task('watch:elm', ['build:elm'], () => {
  return gulp.watch('src/elm/**/*.elm', ['build:elm'])
})

// Dev watch task
gulp.task('watch:webpack', ['build:elm'], (callback) => {
  modules.reduce((previous, module) => {
    return previous.then(() => {
      var taskName = createTaskName(module.name)
      return gulp.watch(module.watch, [module.watchActions])
    })
  }, Promise.resolve())
    .then(() => callback())
})

gulp.task('watch:livereload', () => {
  livereload.listen()
  return gulp.watch('dev/main.css').on('change', livereload.changed)
})

gulp.task('watch', ['watch:webpack', 'watch:elm', 'watch:html', 'watch:livereload'])

gulp.task('build', ['build:webpack', 'build:elm', 'build:html'])
