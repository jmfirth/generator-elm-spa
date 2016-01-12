module App.Views.Counter.Models (CounterView, emptyCounterView) where

import App.Components.Counter exposing (Counter, emptyCounter)


type alias CounterView =
  { counter: Counter
  }


emptyCounterView : CounterView
emptyCounterView =
  { counter = emptyCounter
  }
