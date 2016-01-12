module App.Views.Counter.Update (update) where

import Effects exposing (Effects)

import App.Views.Counter.Actions as Actions exposing (Action)
import App.Views.Counter.Models exposing (CounterView)
import App.Components.Counter as CounterComponent


update : Action -> CounterView -> (CounterView, Effects Action)
update action counterView =
  case Debug.watch "App.Views.Counter.Action" action of
    Actions.CounterAction subAction ->
      let
        (counter, fx) =
          CounterComponent.update subAction counterView.counter
      in
        ({counterView | counter = counter}, Effects.map Actions.CounterAction fx)
    _ ->
      (counterView, Effects.none)
