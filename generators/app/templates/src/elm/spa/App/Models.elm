module App.Models (Site, emptySite) where

import Hop

import App.Views.Home.Models exposing (HomeView, emptyHomeView)
import App.Views.Counter.Models exposing (CounterView, emptyCounterView)


type alias Site =
  { routerPayload : Hop.Payload
  , view : String
  , homeView : HomeView
  , counterView : CounterView
  }


emptySite : Hop.Payload -> Site
emptySite payload =
  { routerPayload = payload
  , view = ""
  , homeView = emptyHomeView
  , counterView = emptyCounterView
  }
