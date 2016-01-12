module App.Update (update) where

import Debug

import Effects exposing (Effects)
import Hop

import App.Actions as Actions exposing (Action)
import App.Models exposing (Site)
import App.Views.Home.Update as HomeViewUpdate
import App.Views.Counter.Update as CounterViewUpdate


update : Action -> Site -> (Site, Effects Action)
update action site =
  case Debug.watch "App.Action" action of
    Actions.HomeViewAction subAction ->
      let
        (homeView, fx) =
          HomeViewUpdate.update subAction site.homeView
      in
        ({site | homeView = homeView}, Effects.map Actions.HomeViewAction fx)
    Actions.CounterViewAction subAction ->
      let
        (counterView, fx) =
          CounterViewUpdate.update subAction site.counterView
      in
        ({site | counterView = counterView}, Effects.map Actions.CounterViewAction fx)
    Actions.ShowHome payload ->
      ({site | view = "home", routerPayload = payload}, Effects.none)
    Actions.ShowCounter payload ->
      ({site | view = "counter", routerPayload = payload}, Effects.none)
    Actions.NavigateTo path ->
      (site, Effects.map Actions.HopAction (Hop.navigateTo path))
    Actions.ShowNotFound payload ->
      ({site | view = "notFound", routerPayload = payload}, Effects.none)
    _ ->
      (site, Effects.none)
