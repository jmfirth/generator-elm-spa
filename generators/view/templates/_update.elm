module App.Views.<%= ProperName %>.Update (update) where

import Debug

import Effects exposing (Effects)

import App.Views.<%= ProperName %>.Actions as Actions exposing (Action)
import App.Views.<%= ProperName %>.Models exposing (<%= ProperName %>View)


update : Action -> <%= ProperName %>View -> (<%= ProperName %>View, Effects Action)
update action <%= camelName %> =
  case Debug.watch "App.Views.<%= ProperName %>.Action" action of
    _ ->
      (<%= camelName %>, Effects.none)
