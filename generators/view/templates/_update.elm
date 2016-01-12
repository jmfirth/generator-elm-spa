module App.Views.Home.Update (update) where

import Debug

import Effects exposing (Effects)

import App.Views.Home.Actions as Actions exposing (Action)
import App.Views.Home.Models exposing (ViewModel)


update : Action -> ViewModel -> (ViewModel, Effects Action)
update action model =
  case Debug.watch "App.Views.Home.Action" action of
    _ ->
      (model, Effects.none)
