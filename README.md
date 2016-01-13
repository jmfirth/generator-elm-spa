# generator-elm-spa

> [Yeoman](http://yeoman.io) generator for [Elm](http://elm-lang.org/) SPA's

Scaffold an Elm SPA.

## Status

**Base SPA example:**

- [x] Multiple views
- [x] Smart and dumb components
- [x] [`Hop`](http://package.elm-lang.org/packages/sporto/hop/latest) router
- [x] Native modules and tooling
- [x] PostCSS/CSSNext style pre/postprocessor
- [x] SourceMaps for native modules
- [x] Watch tooling for native modules and styles via [`Gulp`](http://gulpjs.com/) and [`Webpack`](https://webpack.github.io/)
- [x] Dev debugging via [`elm-reactor`](https://github.com/elm-lang/elm-reactor)
- [x] Tooling to build for distribution
- [ ] Environment-specific configuration

Current distribution build does not correctly feed environment-specific configuration of main stylesheet URL.  This is needed to support the differences in stylesheet paths when developing via `elm-reactor` versus being built for distribution.

**View:**

- [x] Generates separate Actions, Models, Updates, and View source files
- [x] Generated source placed in `src\elm\spa\App\Views` in it's own subfolder
- [x] Generated View compiles

**Component:**

- [x] Generates a single source file containing Actions, Models, Updates, and View
- [x] Generated source placed in `src\elm\spa\App\Components`
- [x] Generated Component compiles

## Getting Started

```sh
$ npm install -g yo
```

To install generator-elmlang from npm, run:

```sh
$ npm install -g generator-elm-spa
```

Finally, initiate the generator:

```sh
$ yo elm-spa
```

## Generators

In addition to the base SPA scaffolding, this generator also scaffolds views:

```sh
$ yo elm-spa:view MyView
```

and components:

```sh
$ yo elm-spa:component MyComponent
```

## Tooling

### Development

Watch

```sh
$ npm run watch
```

Debug Server

```sh
$ npm run server
```

### Distribution

Build

```sh
$ npm run build
```

## SPA Structure

```
dist\                             - distribution folder
elm-stuff\                        - Elm package and build folder
node_modules\                     - NPM module folder
src\                              - Source folder
   elm\                           - Elm source folder
      native\                     - Custom native Elm module source folder
        Native\                   - Native modules are built and output here
        Hello.elm                 - Custom Elm wrapper for the Hello native module example
      spa\                        - Elm SPA source folder
        App\                      - Main App folder
          Components\             - SPA components folder
             Bootstrap.elm        - Example Bootstrap components (smart and dumb)
             Counter.elm          - Example Counter component (smart)
          Views\                  - SPA views folder
            Counter\              - Counter view example
               Actions.elm        - Counter view actions
               Models.elm         - Counter view models
               Update.elm         - Counter view update method
               View.elm           - Counter view's view
            Error\                - Error views
               Empty\             - Empty view
                  View.elm        - Empty view's view
               NotFound\          - NotFound view
                  View.elm        - NotFound view's view
            Home\                 - Home view example
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
   html\                          - HTML source folder
    index.html                    - Index template for distribution
   js\                            - JavaScript source folder
      hello\                      - Hello example native module
         hello.js                 - Hello example's functional source
         index.js                 - Hello example's native JavaScript wrapper for Elm
   pcss\                          - PostCSS source
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
