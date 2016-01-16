# generator-elm-spa

>  A [`Yeoman`](http://yeoman.io) generator for single-page applications using the [`Elm`](http://elm-lang.org/) language.

 This generator scaffolds a single-page application (SPA) for [`Elm`](http://elm-lang.org/) following the best practices outlined in [The Elm Architecture](https://github.com/evancz/elm-architecture-tutorial/) guide while leveraging the fantastic [`Hop`](http://package.elm-lang.org/packages/sporto/hop/latest) router.  This generator features sub-generators to quickly scaffold additional Views and Components.  In addition, it provides modern developer and release tooling, including: [native module](https://github.com/NoRedInk/take-home/wiki/Writing-Native) development using [`Babel`](https://babeljs.io/) and [`Node.js`](https://nodejs.org) libraries via [`Webpack`](https://webpack.github.io/), automatic recompilation via [`Gulp`](http://gulpjs.com/), live reloading of styles using [`gulp-livereload`](https://www.npmjs.com/package/gulp-livereload), modern debugging via [`elm-reactor`](https://github.com/elm-lang/elm-reactor), and separate development and distribution builds.

## Status

**Base generator**

- [x] Multiple views
- [x] Smart and dumb components
- [x] [`Hop`](http://package.elm-lang.org/packages/sporto/hop/latest) router
- [x] Native modules and tooling
- [x] PostCSS/CSSNext style pre/postprocessor with live reloading
- [x] SourceMaps for native modules
- [x] Watch tooling for native modules and styles via [`Gulp`](http://gulpjs.com/) and [`Webpack`](https://webpack.github.io/)
- [x] ~~Hot swapping~~ ([broken in 0.16]()) and time travel debugging via [`elm-reactor`](https://github.com/elm-lang/elm-reactor)
- [x] Tooling to build for distribution
- [x] Environment-specific configuration

**View sub-generator**

- [x] Generates separate source files
- [x] Generated source placed in `src/elm/spa/App/Views` in it's own subfolder
- [x] Generated View compiles

**Component sub-generator**

- [x] Generates a single source file
- [x] Generated source placed in `src/elm/spa/App/Components`
- [x] Generated Component compiles

## Getting Started

```sh
$ npm install -g yo
```

To install `generator-elm-spa` run:

```sh
$ npm install -g generator-elm-spa
```

Then start the generator:

```sh
$ yo elm-spa
```

Once the generator is complete you can run the web server:

```sh
$ npm run server
```

Then navigate to [`http://localhost:8000/dev/index.html`](http://localhost:8000/dev/index.html) for debugging using the `elm-reactor` debugger, or to [`http://localhost:8000/dist/index.html`](http://localhost:8000/dist/index.html) to view the final distribution.

## Sub-generators

In addition to the base SPA scaffolding, this generator also scaffolds views:

```sh
$ yo elm-spa:view MyView
   create src/elm/spa/App/Views/MyView/Actions.elm
   create src/elm/spa/App/Views/MyView/Models.elm
   create src/elm/spa/App/Views/MyView/Update.elm
   create src/elm/spa/App/Views/MyView/View.elm
```

and components:

```sh
$ yo elm-spa:component MyComponent
   create src/elm/spa/App/Components/MyComponent.elm
```

## Tooling

Manually create development and distribution builds:

```sh
$ npm run build
```

Watch all source for changes and automatically recompile as necessary:

```sh
$ npm run watch
```

Run the `elm-reactor` web server:

```sh
$ npm run server
```

## SPA Structure

```
dev/                              - development build output folder
dist/                             - distribution build output folder
elm-stuff/                        - Elm package and build folder
node_modules/                     - NPM module folder
src/                              - Source folder
   elm/                           - Elm source folder
      native/                     - Custom native Elm module source folder
         Native/                  - Native modules are built and output here
         Hello.elm                - Custom Elm wrapper for the Hello native module example
      spa/                        - Elm SPA source folder
         App/                     - Main App folder
            Components/           - SPA components folder
               Bootstrap.elm      - Example Bootstrap components (dumb)
               Counter.elm        - Example Counter component (smart)
               Navbar.elm         - Example Navbar component (smart)
         Views/                   - SPA views folder
            Counter/              - Counter view example folder
               Actions.elm        - Counter view actions
               Models.elm         - Counter view models
               Update.elm         - Counter view update method
               View.elm           - Counter view's view
            Error/                - Error views
               Empty/             - Empty view folder
                  View.elm        - Empty view's view
               NotFound/          - NotFound view folder
                  View.elm        - NotFound view's view
            Home/                 - Home view example folder
               Actions.elm        - Home view actions
               Models.elm         - Home view models
               Update.elm         - Home view update methods
               View.elm           - Home view's view
          Actions.elm             - App actions
          App.elm                 - App entry point
          Models.elm              - App models
          Router.elm              - App router
          Update.elm              - App update method
          View.elm                - App's main view
   html/                          - HTML source folder
      index.dev.html              - Index template for development build
      index.dist.html             - Index template for distribution build
   js/                            - JavaScript source folder
      hello/                      - Hello example native module
         hello.js                 - Hello example's functional source
         index.js                 - Hello example's native JavaScript wrapper for Elm
   pcss/                          - PostCSS source
      main.pcss                   - Style entrypoint
      _elm-reactor.pcss           - Override styles for `elm-reactor` overlay
.babelrc                          - Babel 6 configuration
.gitignore                        - `Git` ignore file
elm-package.json                  - `elm-package` file
Gulpfile.js                       - `Gulp` task definitions
package.json                      - `npm` package file
README.md                         - SPA project readme
```

## License

MIT
