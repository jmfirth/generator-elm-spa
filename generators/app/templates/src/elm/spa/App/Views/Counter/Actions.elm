module App.Views.Counter.Actions where

import App.Components.Counter as CounterComponent


type Action
  = CounterAction CounterComponent.Action
  | NoOp
