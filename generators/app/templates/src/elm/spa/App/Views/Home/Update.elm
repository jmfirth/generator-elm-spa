module App.Views.Home.Update (update) where

import Debug

import Effects exposing (Effects)

import App.Views.Home.Actions as Actions exposing (Action)
import App.Views.Home.Models exposing (HomeView)


update : Action -> HomeView -> (HomeView, Effects Action)
update action homeView =
  case Debug.watch "App.Views.Home.Action" action of
    _ ->
      (homeView, Effects.none)
