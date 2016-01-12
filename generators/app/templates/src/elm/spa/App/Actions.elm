module App.Actions where

import Hop

import App.Views.Home.Actions as HomeViewActions
import App.Views.Counter.Actions as CounterViewActions


type Action
  = HopAction Hop.Action
  | HomeViewAction HomeViewActions.Action
  | CounterViewAction CounterViewActions.Action
  | ShowHome Hop.Payload
  | ShowCounter Hop.Payload
  | NavigateTo String
  | ShowNotFound Hop.Payload
  | NoOp
